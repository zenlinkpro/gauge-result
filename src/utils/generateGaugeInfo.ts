import JSBI from 'jsbi'
import type { ReadContractsConfig } from '@wagmi/core'
import {
  allChains,
  configureChains,
  createClient,
  readContract,
  readContracts,
} from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import type { Farming, Gauge } from '@zenlink-dex/zenlink-evm-contracts'
import gaugeABI from '@zenlink-dex/zenlink-evm-contracts/abi/Gauge.json'
import farmingABI from '@zenlink-dex/zenlink-evm-contracts/abi/Farming.json'
import { STABLE_SHARE, TOTAL_SHARE } from '../constants'
import type { EthereumChainId, GaugePoolInfo, GaugeQueryOptions } from '../types'
import { chainsForWagmi } from '../config'
import type { GraphPoolState } from '../graph/queries/gauge'
import { fetchGraphGaugeData } from '../graph/queries/gauge'
import { basicRewards } from '../rewards'
import { GaugeRewardsNotFoundError } from '../errors'

const { provider } = configureChains([...allChains, ...chainsForWagmi], [publicProvider()])
createClient({ provider })

export async function generateGaugeInfo(options: GaugeQueryOptions) {
  const {
    chainName,
    gaugeAddress,
    periodId,
    farmingAddress,
    ethereumChainId,
  } = options
  let error: Error | undefined

  const [currentPeriodId, poolLength] = await Promise.all([
    getCurrentPeriodId(gaugeAddress, ethereumChainId),
    getFarmingPoolLength(farmingAddress, ethereumChainId),
  ])

  if (periodId && periodId > Number(currentPeriodId))
    throw new Error(`Provided periodId ${periodId} larger than current periodId ${currentPeriodId}`)

  const exactPeriodId = periodId ?? Number(currentPeriodId)
  const { data: graphGaugeData, error: graphError } = await fetchGraphGaugeData(
    chainName,
    gaugeAddress.toLowerCase(),
    exactPeriodId,
  )

  if (!graphGaugeData && graphError)
    throw new Error('Graph fetch error')

  const allPoolStates = graphGaugeData?.periodStates[0]?.allPoolStates
  const allPoolStatesMap = allPoolStates
    ? allPoolStates.reduce((accum: { [poolId: number]: GraphPoolState }, poolState) => {
      accum[poolState.poolId] = poolState
      return accum
    }, {})
    : {}

  const gaugePoolInfo = await getGaugePoolInfo(
    Array.from({ length: Number(poolLength) }, (_, i) => i)
      .filter(id => !!allPoolStatesMap[id]),
    options,
  )

  // fetch old period data should update score from graph data
  if (exactPeriodId < Number(currentPeriodId)) {
    gaugePoolInfo.forEach((pool) => {
      const graphPoolState = allPoolStatesMap[pool.pid]
      pool.amount = graphPoolState?.totalAmount ?? '0'
      pool.score = graphPoolState?.score ?? '0'
    })
  }

  const stablePoolInfos: GaugePoolInfo[] = []
  const standardPoolInfos: GaugePoolInfo[] = []

  gaugePoolInfo.forEach((info) => {
    if (info.stable)
      stablePoolInfos.push(info)
    else
      standardPoolInfos.push(info)
  })

  const stablePoolTotalScore = stablePoolInfos.reduce(
    (totalScore, { score }) => JSBI.add(totalScore, JSBI.BigInt(score)), JSBI.BigInt(0),
  )

  const standardPoolTotalScore = standardPoolInfos.reduce(
    (totalScore, { score }) => JSBI.add(totalScore, JSBI.BigInt(score)), JSBI.BigInt(0),
  )

  const gaugeRewards = basicRewards[chainName].find(rewards => rewards.periodId === exactPeriodId)
  if (!gaugeRewards)
    error = new GaugeRewardsNotFoundError(exactPeriodId)

  const rewardsDetails = gaugeRewards?.rewards.map(({ token, amount, description }) => {
    const amountForStablePool = JSBI.divide(
      JSBI.multiply(JSBI.BigInt(amount), JSBI.BigInt(STABLE_SHARE)),
      JSBI.BigInt(TOTAL_SHARE),
    )
    const amountForStandardPool = JSBI.subtract(JSBI.BigInt(amount), amountForStablePool)

    return {
      stableDetails: {
        type: gaugeRewards.type,
        token,
        amount: amountForStablePool,
        description,
      },
      standardDetails: {
        type: gaugeRewards.type,
        token,
        amount: amountForStandardPool,
        description,
      },
    }
  }) || []

  const stableRewardsDetails = rewardsDetails.map(detail => detail.stableDetails)
  const stableGaugePoolRewards = stablePoolInfos.map((pool) => {
    const rewards = stableRewardsDetails.map(({ token, amount, type, description }) => {
      return {
        token,
        amount: JSBI.divide(
          JSBI.multiply(JSBI.BigInt(amount), JSBI.BigInt(pool.score)),
          stablePoolTotalScore,
        ).toString(),
        type,
        description,
      }
    })

    return {
      pid: pool.pid,
      rewards,
      pool,
    }
  })

  const standardRewardsDetails = rewardsDetails.map(detail => detail.standardDetails)
  const standardGaugePoolRewards = standardPoolInfos.map((pool) => {
    const rewards = standardRewardsDetails.map(({ token, amount, type, description }) => {
      return {
        token,
        amount: JSBI.divide(
          JSBI.multiply(JSBI.BigInt(amount), JSBI.BigInt(pool.score)),
          JSBI.BigInt(standardPoolTotalScore),
        ).toString(),
        type,
        description,
      }
    })

    return {
      pid: pool.pid,
      rewards,
      pool,
    }
  })

  return {
    exactPeriodId,
    error,
    totalScore: JSBI.add(stablePoolTotalScore, standardPoolTotalScore).toString(),
    stablePoolTotalScore: stablePoolTotalScore.toString(),
    standardPoolTotalScore: standardPoolTotalScore.toString(),
    stablePoolInfos,
    standardPoolInfos,
    stableGaugePoolRewards,
    standardGaugePoolRewards,
  }
}

async function getCurrentPeriodId(contract: string, chainId: EthereumChainId) {
  return (await readContract<Gauge, ReturnType<Gauge['getCurrentPeriodId']>>({
    addressOrName: contract,
    functionName: 'getCurrentPeriodId',
    args: [],
    chainId,
    contractInterface: gaugeABI,
  })).toString()
}

async function getFarmingPoolLength(contract: string, chainId: EthereumChainId) {
  return (await readContract<Farming, ReturnType<Farming['poolLength']>>({
    addressOrName: contract,
    functionName: 'poolLength',
    args: [],
    chainId,
    contractInterface: farmingABI,
  })).toString()
}

export async function getGaugePoolInfo(
  pids: number[],
  options: GaugeQueryOptions,
) {
  const { gaugeAddress, ethereumChainId } = options
  const contracts: ReadContractsConfig['contracts'] = pids.map(pid => ({
    addressOrName: gaugeAddress,
    functionName: 'getPoolInfo',
    args: [pid],
    chainId: ethereumChainId,
    contractInterface: gaugeABI,
  }))
  const results = await readContracts<Awaited<ReturnType<Gauge['getPoolInfo']>>[]>({
    contracts,
  })
  return results.map(({
    score,
    stable,
    farmingToken,
    amount,
    rewardTokens,
    rewardPerBlock,
    accRewardPerShare,
    lastRewardBlock,
    startBlock,
    claimableInterval,
  }, i) => ({
    pid: pids[i],
    score: score.toString(),
    stable,
    farmingToken,
    amount: amount.toString(),
    rewardTokens,
    rewardPerBlock: rewardPerBlock.map(reward => reward.toString()),
    accRewardPerShare: accRewardPerShare.map(share => share.toString()),
    lastRewardBlock: lastRewardBlock.toString(),
    startBlock: startBlock.toString(),
    claimableInterval: claimableInterval.toString(),
  }))
}
