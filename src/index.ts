import { JsonRpcProvider } from '@ethersproject/providers'
import { generateGaugeInfo } from './utils/generateGaugeInfo'
import { queryFoundationFarmingRate } from './utils/queryFoundationFarmingRate'
import { queryProjectFarmingRate } from './utils/queryProjectFarmingRate'
import { CHAIN_CONFIG_MAP } from './config'
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
  } = CHAIN_CONFIG_MAP[chainName]
  const provider = new JsonRpcProvider(rpc)

  const gaugeInfo = await generateGaugeInfo({
    rpc,
    gaugeAddress,
    multicallAddress,
    periodId,
    provider,
    farmingAddress,
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
