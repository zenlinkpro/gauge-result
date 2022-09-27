export const projectRewards = [
  {
    pid: 0,
    token: '0x233',
    amount: '501111',
  },
]

export async function queryProjectReward() {
  return Promise.resolve(projectRewards)
}
