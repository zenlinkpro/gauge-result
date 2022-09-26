import { queryProjectReward } from './reward/project.js'
import type { ProjectRewards } from './types.js'

export async function queryProjectFarmingRate() {
  const projectRewards: ProjectRewards[] = await queryProjectReward()
  return {
    projectRewards,
  }
}
