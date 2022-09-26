import { queryFoundationReward } from './reward/foundation.js'
import type { ProjectRewards } from './types.js'

export async function queryFoundationFarmingRate() {
  const projectRewards: ProjectRewards[] = await queryFoundationReward()
  return {
    projectRewards,
  }
}
