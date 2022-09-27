import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import type { BigNumber } from 'ethers'
import { Contract } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import GAUGE_ABI from '../abi/gauge.json'
import MULTICALL_ABI from '../abi/multicall.json'
import { queryGaugeRewards } from '../reward/gauge.js'
import { STABLE_SHARE, TOTAL_SHARE } from '../constants'
import type { GaugePoolInfo, GaugeQueryOptions } from '../types'
import { decodeEvmCallResult, encodeEvmCallData } from './evmResult'

export async function generateGaugeInfo(options: GaugeQueryOptions) {
  const gaugePoolInfo = await queryGaugePoolInfo([0, 1], options)

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

  const contract = new Contract(options.contractAddress, GAUGE_ABI)
    .connect(new JsonRpcProvider(options.rpc))
  const periodID: BigNumber = await contract.callStatic.getCurrentPeriodId()

  const gaugeRewards = await queryGaugeRewards(periodID.toNumber())
  invariant(!!gaugeRewards, 'cannot find gaugeRewards')

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

export async function queryGaugePoolInfo(
  pids: number[],
  options: GaugeQueryOptions,
): Promise<GaugePoolInfo[]> {
  const { rpc, multicallAddress, contractAddress } = options

  const multicalls = pids.map(pid => ({
    target: contractAddress,
    calls: [{
      method: 'getPoolInfo',
      callData: encodeEvmCallData(GAUGE_ABI, 'getPoolInfo', [pid]),
    }],
  }))

  const callChunks = multicalls.map(({ target, calls }) => (
    calls.map(({ method, callData }) => ({
      target,
      method,
      callData,
    }))),
  ).flat()

  const contract = new Contract(multicallAddress, MULTICALL_ABI)
    .connect(new JsonRpcProvider(rpc))
  const results = await contract.callStatic.tryAggregate(
    false,
    callChunks,
  )

  const callResults = multicalls.reduce<any[]>((memo, current, i) => {
    memo = [...memo, [...results].splice(i * current.calls.length, current.calls.length)]

    return memo
  }, [])

  if (!callResults)
    return []

  return callResults.map((results, i) => {
    const {
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
    } = results.map((result: { returnData: string }) => decodeEvmCallResult(
      GAUGE_ABI,
      'getPoolInfo',
      result.returnData,
    ))[0]

    return {
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
    }
  })
}
