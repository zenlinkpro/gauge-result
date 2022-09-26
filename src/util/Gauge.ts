import axios from 'axios'
import gaugeAbi from '../abi/gauge.json'
import multicallAbi from '../abi/multicall.json'
import { decodeEvmCallResult, encodeEvmCallData } from './util.js'

export interface QueryScoreParams {
  multicallAddress: string
  gaugeAddress: string
  rpc: string
}
export async function queryPoolPeriodStateMulticall(pids: number[], {
  rpc,
  multicallAddress,
  gaugeAddress,
}: QueryScoreParams) {
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
