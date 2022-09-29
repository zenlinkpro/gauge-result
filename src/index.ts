import { generateGaugeInfo } from './utils/generateGaugeInfo'
import { CHAIN_CONFIGS } from './config'
import type { ChainName, FarmingParametersResult } from './types'
import { generateFundationRewards, generateProjectRewards } from './utils/rewards'

export async function generateFarmingParameters(
  chainName: ChainName,
  periodId?: number,
): Promise<FarmingParametersResult> {
  const {
    rpc,
    gaugeAddress,
    multicallAddress,
    farmingAddress,
    ethereumChainId,
  } = CHAIN_CONFIGS[chainName]

  const {
    exactPeriodId,
    stablePoolInfos,
    standardPoolInfos,
    stablePoolTotalScore,
    standardPoolTotalScore,
    totalScore,
    standardGaugePoolRewards,
    stableGaugePoolRewards,
  } = await generateGaugeInfo({
    chainName,
    rpc,
    gaugeAddress,
    multicallAddress,
    periodId,
    farmingAddress,
    ethereumChainId,
  })

  const fundationRewards = generateFundationRewards(chainName, exactPeriodId)
  const projectRewards = generateProjectRewards(chainName, exactPeriodId)

  for (const gaugePoolReward of [...standardGaugePoolRewards, ...stableGaugePoolRewards]) {
    const fundationReward = fundationRewards?.rewards
      .find(reward => reward.pid === gaugePoolReward.pool.pid)
    const projectReward = projectRewards?.rewards
      .find(reward => reward.pid === gaugePoolReward.pool.pid)

    if (fundationReward) {
      gaugePoolReward.rewards.push({
        token: fundationReward.token,
        amount: fundationReward.amount,
      })
    }

    if (projectReward) {
      gaugePoolReward.rewards.push({
        token: projectReward.token,
        amount: projectReward.amount,
      })
    }
  }

  return {
    chainName,
    exactPeriodId,
    totalScore,
    standardPoolTotalScore,
    stablePoolTotalScore,
    allPoolInfos: [...standardPoolInfos, ...stablePoolInfos],
    allPoolRewards: [...standardGaugePoolRewards, ...stableGaugePoolRewards],
  }
}
