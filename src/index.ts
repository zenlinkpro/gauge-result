import { generateGaugeInfo } from './utils/generateGaugeInfo'
import { queryFoundationFarmingRate } from './utils/queryFoundationFarmingRate'
import { queryProjectFarmingRate } from './utils/queryProjectFarmingRate'
import { CHAIN_CONFIGS } from './config'
import type { ChainName, FarmingRateResult } from './types'

export async function generateFarmingParameters(
  chainName: ChainName,
  periodId?: number,
): Promise<FarmingRateResult> {
  const {
    rpc,
    gaugeAddress,
    multicallAddress,
    farmingAddress,
    ethereumChainId,
  } = CHAIN_CONFIGS[chainName]

  const gaugeInfo = await generateGaugeInfo({
    rpc,
    gaugeAddress,
    multicallAddress,
    periodId,
    farmingAddress,
    ethereumChainId,
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
