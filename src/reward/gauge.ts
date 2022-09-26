export const gaugeRewards = [
  {
    token: '0x233',
    amount: '501111',
  },
]

export async function queryGaugeReward() {
  return Promise.resolve(gaugeRewards)
}
