import { queryFoundationReward } from './reward/foundation.js'

export interface ProjectRewards {
  pid: number
  token: string
  amount: number | string
}
export interface FoundationParam {
  gaugeAddress: string
  rpc: string
  multicall: string
}

export async function queryFoundationFarmingRate() {
  const projectRewards: ProjectRewards[] = await queryFoundationReward()
  return {
    projectRewards,
  }
}
