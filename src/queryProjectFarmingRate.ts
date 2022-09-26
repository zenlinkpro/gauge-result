import { queryProjectReward } from './reward/project.js'

export interface ProjectRewards {
  pid: number
  token: string
  amount: number | string
}
export interface ProjectParam {
  gaugeAddress: string
  rpc: string
  multicall: string
}

export async function queryProjectFarmingRate() {
  const projectRewards: ProjectRewards[] = await queryProjectReward()
  return {
    projectRewards,
  }
}
