import invariant from 'tiny-invariant'
import { generateGaugeInfo } from './util/queryGaugeFarmingRate.js'
import { queryFoundationFarmingRate } from './queryFoundationFarmingRate.js'
import { queryProjectFarmingRate } from './queryProjectFarmingRate.js'
import { CHAIN_CONFIG_MAP } from './config.js'
import type { ChainName, FarmingRateResult } from './types.js'

export async function queryFarmingRate(chainName: ChainName): Promise<FarmingRateResult> {
  const chainConfig = CHAIN_CONFIG_MAP[chainName]
  const rpc = chainConfig.rpcUrls?.[0]
  const contractAddress = chainConfig.gaugeAddress
  const multicallAddress = chainConfig.multicall

  invariant(rpc, 'has no rpc!')
  invariant(contractAddress, 'has no gaugeAddress!')
  invariant(multicallAddress, 'has no multicall!')

  const gaugeInfo = await generateGaugeInfo({
    rpc,
    contractAddress,
    multicallAddress,
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
