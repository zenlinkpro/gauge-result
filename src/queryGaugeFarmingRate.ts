import axios from 'axios'
import JSBI from 'jsbi'
import { gaugeAbi } from './abi/gaugeAbi.js'
import { multicallAbi } from './abi/multicallCallAbi.js'
import { queryGaugeReward } from './reward/gauge.js'
import { decodeEvmCallResult, encodeEvmCallData } from './util/util.js'

export interface GaugePoolInfo {
  pid: number
  score: number
  poolInfo: any
}

export interface GaugeRewards {
  token: string
  amount: number | string
}

export const STABLE_SHARE = 20
export const STANDARD_SHARE = 80
export const TOTAL_SHARE = STABLE_SHARE + STANDARD_SHARE
export interface GaugeParam {
  gaugeAddress: string
  rpc: string
  multicall: string
}

export async function queryGaugeFarmingRate(param: GaugeParam) {
  const gaugePoolInfo = await queryGaugePoolStateInfo([0, 1], param)

  const gaugeScoreInfo: GaugePoolInfo[] = gaugePoolInfo.map((item) => {
    return {
      pid: item.pid,
      score: item.poolInfo.score,
      poolInfo: item.poolInfo,
    }
  })

  const groupScore: {
    stable: GaugePoolInfo[]
    standard: GaugePoolInfo[]
  } = {
    stable: [],
    standard: [],
  }

  gaugeScoreInfo.reduce((total, cur) => {
    if (cur.poolInfo.stable) {
      total.stable.push(cur)
      return total
    }

    total.standard.push(cur)
    return total
  }, groupScore)

  const stableTotalScore = groupScore.stable.reduce((total, cur) => {
    const score = cur.poolInfo.score
    return JSBI.add(total, JSBI.BigInt(score))
  }, JSBI.BigInt(0)).toString()

  const standardTotalScore = groupScore.standard.reduce((total, cur) => {
    const score = cur.poolInfo.score
    return JSBI.add(total, JSBI.BigInt(score))
  }, JSBI.BigInt(0)).toString()

  // gauge rewards;
  const gaugeRewards = await queryGaugeReward()

  const groupGrugeRewards = gaugeRewards.map((reward) => {
    const stableRewardAmount = JSBI.divide(
      JSBI.multiply(JSBI.BigInt(reward.amount), JSBI.BigInt(STABLE_SHARE)),
      JSBI.BigInt(TOTAL_SHARE),
    )
    const standardRewardAmount = JSBI.subtract(
      JSBI.BigInt(reward.amount),
      stableRewardAmount,
    )
    return {
      stable: {
        token: reward.token,
        amount: stableRewardAmount,
      },
      standard: {
        token: reward.token,
        amount: standardRewardAmount,
      },
    }
  })

  const stableTotalGaugeRewards = groupGrugeRewards.map(item => item.stable)
  const stableGaugePoolRewards = groupScore.stable.map((pool) => {
    const rewards = stableTotalGaugeRewards.map((gaugeReward) => {
      return {
        token: gaugeReward.token,
        amount: JSBI.divide(
          JSBI.multiply(JSBI.BigInt(gaugeReward.amount), JSBI.BigInt(pool.score)),
          JSBI.BigInt(stableTotalScore),
        ),
      }
    })
    return {
      rewards,
      pool,
    }
  })

  const standardTotalGaugeRewards = groupGrugeRewards.map(item => item.standard)
  const standardGaugePoolRewards = groupScore.standard.map((pool) => {
    const rewards = standardTotalGaugeRewards.map((gaugeReward) => {
      return {
        token: gaugeReward.token,
        amount: JSBI.divide(
          JSBI.multiply(JSBI.BigInt(gaugeReward.amount), JSBI.BigInt(pool.score)),
          JSBI.BigInt(standardTotalScore),
        ),
      }
    })
    return {
      rewards,
      pool,
    }
  })

  return {
    stableTotalScore,
    stableGaugePool: groupScore.stable,
    stableGaugePoolRewards,
    standardTotalScore,
    standardGaugePool: groupScore.standard,
    standardGaugePoolRewards,
  }
}

export interface QueryScoreParams {
  multicallAddress: string
  gaugeAddress: string
  rpc: string
}
export async function queryGaugePoolStateInfo(pids: number[], {
  rpc,
  multicall: multicallAddress,
  gaugeAddress,
}: GaugeParam) {
  const basicCalls = [
    { method: 'getPoolInfo' },
  ]
  const calls = pids.map(pid => ({
    contract: gaugeAddress,
    calls: [{
      method: basicCalls[0].method,
      callData: encodeEvmCallData(gaugeAbi, basicCalls[0].method, [pid]),

    }],
  }))
  const callChunks = calls.map(call => (
    call.calls.map(chunk => ({
      target: call.contract,
      method: chunk.method,
      callData: chunk.callData,
    }))),
  ).flat()

  const results = await axios.post(rpc, {
    id: 0,
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [
      {
        to: multicallAddress,
        data: encodeEvmCallData(multicallAbi, 'tryAggregate', [false, callChunks]),
      },
    ],
  })

  const rpcResults = decodeEvmCallResult(multicallAbi, 'tryAggregate', results.data.result).returnData as any[]
  const callResults = calls.reduce<any[]>((memo, current, i) => {
    memo = [...memo, [...rpcResults].splice(i * current.calls.length, current.calls.length)]

    return memo
  }, [])

  return callResults?.map((results, i) => {
    const [
      _poolInfo,
    ] = results.map((result: any, i: number) => (
      decodeEvmCallResult(gaugeAbi, basicCalls[i].method, result.returnData)
    ))

    const { farmingToken, rewardTokens, score, stable } = _poolInfo

    const poolInfo = {
      ..._poolInfo,
      stable,
      rewardTokens,
      farmingToken,
      score: score.toString(),
    }
    return {
      pid: pids[i],
      poolInfo,
    }
  }) ?? []
}
