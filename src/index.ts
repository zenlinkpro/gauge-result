import JSBI from 'jsbi'
import { generateGaugeInfo } from './utils/generateGaugeInfo'
import { CHAIN_CONFIGS } from './config'
import type {
  ChainName,
  ContractCallParameters,
  GaugeResult,
  GenerateOptions,
} from './types'
import { generateFundationRewards, generateProjectRewards } from './utils/rewards'

export async function generateGaugeResult(
  chainName: ChainName,
  options?: GenerateOptions,
): Promise<GaugeResult> {
  const {
    generateContractCallParameters = false,
    periodId,
  } = options || {}

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

  const allPoolRewards = [...standardGaugePoolRewards, ...stableGaugePoolRewards]
  for (const gaugePoolReward of allPoolRewards) {
    const fundationReward = fundationRewards?.rewards
      .find(reward => reward.pid === gaugePoolReward.pool.pid)
    const projectReward = projectRewards?.rewards
      .find(reward => reward.pid === gaugePoolReward.pool.pid)

    if (fundationReward) {
      gaugePoolReward.rewards.push({
        ...fundationReward,
        type: fundationRewards!.type,
      })
    }

    if (projectReward) {
      gaugePoolReward.rewards.push({
        ...projectReward,
        type: projectRewards!.type,
      })
    }
  }

  let contractCallParameters: ContractCallParameters[] | null = null

  if (generateContractCallParameters) {
    contractCallParameters = allPoolRewards.map(({ pool, rewards }) => {
      const { rewardTokens, pid } = pool
      const rewardPerBlock = rewardTokens.map((token) => {
        const rewardInfos = rewards.filter(reward =>
          reward.token.toLowerCase() === token.toLowerCase(),
        )
        return rewardInfos.length
          ? rewardInfos.reduce((accum, info) =>
            JSBI.add(accum, JSBI.BigInt(info.amount)), JSBI.BigInt(0)).toString()
          : '0'
      })

      return {
        pid,
        method: 'set',
        parameters: [pid, rewardPerBlock, true],
      }
    })
  }

  return {
    chainName,
    exactPeriodId,
    totalScore,
    standardPoolTotalScore,
    stablePoolTotalScore,
    allPoolInfos: [...standardPoolInfos, ...stablePoolInfos],
    allPoolRewards,
    contractCallParameters,
  }
}

export { ChainName, CHAIN_CONFIGS }
