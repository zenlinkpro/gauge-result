export const  foundationRewards = [
  {
    pid: 0,
    token: '0x233',
    amount: '501111',
  }
];

export async function queryFoundationReward() {
  return Promise.resolve(foundationRewards);
}