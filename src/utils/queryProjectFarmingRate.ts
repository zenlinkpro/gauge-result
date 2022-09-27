import { queryProjectReward } from '../rewards/project'
import type { ProjectRewards } from '../types'

export async function queryProjectFarmingRate() {
  const projectRewards: ProjectRewards[] = await queryProjectReward()
  return {
    projectRewards,
  }
}
