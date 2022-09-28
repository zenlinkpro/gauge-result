import type { GaugeRewards } from '../types'

export const gaugeRewards: GaugeRewards[] = [
  {
    periodId: 0,
    rewards: [
      {
        token: '0x233',
        amount: '501111',
      },
    ],
  },
  {
    periodId: 1,
    rewards: [
      {
        token: '0x233',
        amount: '501111',
      },
    ],
  },
  {
    periodId: 2,
    rewards: [
      {
        token: '0x233',
        amount: '501111',
      },
    ],
  },
]

export async function queryGaugeRewards(periodId: number) {
  return Promise.resolve(gaugeRewards.find(reward => reward.periodId === periodId))
}
