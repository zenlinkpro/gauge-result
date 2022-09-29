import { fundationRewards, projectRewards } from '../rewards'
import type { ChainName } from '../types'

export function generateFundationRewards(chainName: ChainName, periodId: number) {
  const rewards = fundationRewards[chainName] || []
  return rewards.find(reward => reward.periodId === periodId)
}

export function generateProjectRewards(chainName: ChainName, periodId: number) {
  const rewards = projectRewards[chainName] || []
  return rewards.find(reward => reward.periodId === periodId)
}
