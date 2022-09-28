import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import type { BigNumber } from 'ethers'
import { allChains, configureChains, createClient, readContract } from '@wagmi/core'
import { publicProvider } from '@wagmi/core/providers/public'
import { queryGaugeRewards } from '../rewards/gauge'
import { STABLE_SHARE, TOTAL_SHARE } from '../constants'
import gaugeABI from '../abis/gauge.json'
import farmingABI from '../abis/farming.json'
import type { EthereumChainId, GaugePoolInfo, GaugeQueryOptions } from '../types'
import { chainsForWagmi } from '../config'

const { provider } = configureChains([...allChains, ...chainsForWagmi], [publicProvider()])
createClient({ provider })

export async function generateGaugeInfo(options: GaugeQueryOptions) {
  const {
    gaugeAddress,
    periodId,
    farmingAddress,
    ethereumChainId,
  } = options

  const [currentPeriodId, poolLength] = await Promise.all([
    getCurrentPeriodId(gaugeAddress, ethereumChainId),
    getFarmingPoolLength(farmingAddress, ethereumChainId),
  ])

  if (periodId && periodId > Number(currentPeriodId))
    throw new Error(`Provided periodId ${periodId} larger than current periodId ${currentPeriodId}`)

  const gaugePoolInfo = !periodId || periodId === Number(currentPeriodId)
    ? await getGaugePoolInfo(
      // todo should filter votable pools
      Array.from({ length: Number(poolLength) }, (_, i) => i),
      options,
    )
    // todo graphql fetch
    : []

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

  const gaugeRewards = await queryGaugeRewards(Number(currentPeriodId))
  invariant(!!gaugeRewards, 'Cannot find gaugeRewards')

  const rewardsDetails = gaugeRewards.rewards.map(({ token, amount }) => {
    const amountForStablePool = JSBI.divide(
      JSBI.multiply(JSBI.BigInt(amount), JSBI.BigInt(STABLE_SHARE)),
      JSBI.BigInt(TOTAL_SHARE),
    )
    const amountForStandardPool = JSBI.subtract(JSBI.BigInt(amount), amountForStablePool)

    return {
      stableDetails: {
        token,
        amount: amountForStablePool,
      },
      standardDetails: {
        token,
        amount: amountForStandardPool,
      },
    }
  })

  const stableRewardsDetails = rewardsDetails.map(detail => detail.stableDetails)
  const stableGaugePoolRewards = stablePoolInfos.map((pool) => {
    const rewards = stableRewardsDetails.map(({ token, amount }) => {
      return {
        token,
        amount: JSBI.divide(
          JSBI.multiply(JSBI.BigInt(amount), JSBI.BigInt(pool.score)),
          stablePoolTotalScore,
        ).toString(),
      }
    })
    return { rewards, pool }
  })

  const standardRewardsDetails = rewardsDetails.map(detail => detail.standardDetails)
  const standardGaugePoolRewards = standardPoolInfos.map((pool) => {
    const rewards = standardRewardsDetails.map(({ token, amount }) => {
      return {
        token,
        amount: JSBI.divide(
          JSBI.multiply(JSBI.BigInt(amount), JSBI.BigInt(pool.score)),
          JSBI.BigInt(standardPoolTotalScore),
        ).toString(),
      }
    })
    return { rewards, pool }
  })

  return {
    stablePoolTotalScore: stablePoolTotalScore.toString(),
    standardPoolTotalScore: standardPoolTotalScore.toString(),
    stablePoolInfos,
    standardPoolInfos,
    stableGaugePoolRewards,
    standardGaugePoolRewards,
  }
}

async function getCurrentPeriodId(contract: string, chainId: EthereumChainId) {
  return (await readContract({
    addressOrName: contract,
    functionName: 'getCurrentPeriodId',
    args: [],
    chainId,
    contractInterface: gaugeABI,
  })).toString()
}

async function getFarmingPoolLength(contract: string, chainId: EthereumChainId) {
  return (await readContract({
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
  return Promise.all(
    pids.map(pid =>
      readContract({
        addressOrName: gaugeAddress,
        functionName: 'getPoolInfo',
        args: [pid],
        chainId: ethereumChainId,
        contractInterface: gaugeABI,
      }),
    ),
  ).then(results =>
    results.map(({
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
      rewardPerBlock: rewardPerBlock.map((reward: BigNumber) => reward.toString()),
      accRewardPerShare: accRewardPerShare.map((share: BigNumber) => share.toString()),
      lastRewardBlock: lastRewardBlock.toString(),
      startBlock: startBlock.toString(),
      claimableInterval: claimableInterval.toString(),
    })),
  )
}
