import { queryFoundationReward } from '../rewards/foundation'
import type { ProjectRewards } from '../types'

export async function queryFoundationFarmingRate() {
  const projectRewards: ProjectRewards[] = await queryFoundationReward()
  return {
    projectRewards,
  }
}
