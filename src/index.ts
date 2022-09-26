import invariant from 'tiny-invariant'
import { queryGaugeFarmingRate } from './queryGaugeFarmingRate.js'
import { queryFoundationFarmingRate } from './queryFoundationFarmingRate.js'
import { queryProjectFarmingRate } from './queryProjectFarmingRate.js'
import { CHAIN_CONFIG_MAP } from './config.js'
import type { ChainName, FarmingRateResult } from './types.js'

export async function queryFarmingRate(chainName: ChainName): Promise<FarmingRateResult> {
  const chainConfig = CHAIN_CONFIG_MAP[chainName]
  const rpc = chainConfig.rpcUrls?.[0]
  const gaugeAddress = chainConfig.gaugeAddress
  const multicall = chainConfig.multicall
  invariant(rpc, 'has no rpc!')
  invariant(gaugeAddress, 'has no gaugeAddress!')
  invariant(multicall, 'has no multicall!')

  const gaugeInfo = await queryGaugeFarmingRate({
    rpc,
    gaugeAddress,
    multicall,
  })

  const projectInfo = await queryProjectFarmingRate()

  const foundationInfo = await queryFoundationFarmingRate()

  return {
    chainName,
    gaugeInfo,
    projectInfo,
    foundationInfo,
  }
}
