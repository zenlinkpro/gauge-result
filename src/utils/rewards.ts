import axios from 'axios'
import { DEFAULT_API_PATH } from '../constants'
import type { ChainName, GaugeRewards } from '../types'

export async function generateBasicRewards(chainName: ChainName, periodId: number) {
  const { data: basicRewards } = await axios.get<{ [chainName: string]: GaugeRewards[] }>(
    `${DEFAULT_API_PATH}/basic/basic.json`,
  )
  const rewards = basicRewards[chainName] || []
  return rewards.find(reward => reward.periodId === periodId)
}

export async function generateFundationRewards(chainName: ChainName, periodId: number) {
  const { data: fundationRewards } = await axios.get<{ [chainName: string]: GaugeRewards[] }>(
    `${DEFAULT_API_PATH}/fundation/fundation.json`,
  )
  const rewards = fundationRewards[chainName] || []
  return rewards.find(reward => reward.periodId === periodId)
}

export async function generateProjectRewards(chainName: ChainName, periodId: number) {
  const { data: projectRewards } = await axios.get<{ [chainName: string]: GaugeRewards[] }>(
    `${DEFAULT_API_PATH}/project/project.json`,
  )
  const rewards = projectRewards[chainName] || []
  return rewards.find(reward => reward.periodId === periodId)
}
