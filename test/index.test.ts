import { describe, expect, it } from 'vitest'
import { generateFarmingParameters } from '../src'
import { ChainName } from '../src/types'

describe('chore', () => {
  it('gauge', async () => {
    expect(await generateFarmingParameters(ChainName.Moonbase)).toMatchInlineSnapshot(`
      {
        "chainName": "Moonbase",
        "foundationInfo": {
          "projectRewards": [
            {
              "amount": "501111",
              "pid": 0,
              "token": "0x233",
            },
          ],
        },
        "gaugeInfo": {
          "stableGaugePoolRewards": [],
          "stablePoolInfos": [],
          "stablePoolTotalScore": "0",
          "standardGaugePoolRewards": [
            {
              "pool": {
                "accRewardPerShare": [
                  "0",
                ],
                "amount": "0",
                "claimableInterval": "100",
                "farmingToken": "0xA82e5eF8Ca4670a59129aB09Af5c895D5712Fa3b",
                "lastRewardBlock": "2834954",
                "pid": 0,
                "rewardPerBlock": [
                  "1",
                ],
                "rewardTokens": [
                  "0x1E80A824Ed280c5Ee783D76fdcB634a67C95Edb7",
                ],
                "score": "256000000000000000000",
                "stable": false,
                "startBlock": "2834954",
              },
              "rewards": [
                {
                  "amount": "384372",
                  "token": "0x233",
                },
              ],
            },
            {
              "pool": {
                "accRewardPerShare": [
                  "0",
                ],
                "amount": "0",
                "claimableInterval": "100",
                "farmingToken": "0x4348d845DB2BEbE0eC9F736a89b8266370c78D3c",
                "lastRewardBlock": "2834954",
                "pid": 1,
                "rewardPerBlock": [
                  "1",
                ],
                "rewardTokens": [
                  "0x1E80A824Ed280c5Ee783D76fdcB634a67C95Edb7",
                ],
                "score": "11000000000000000000",
                "stable": false,
                "startBlock": "2834954",
              },
              "rewards": [
                {
                  "amount": "16516",
                  "token": "0x233",
                },
              ],
            },
          ],
          "standardPoolInfos": [
            {
              "accRewardPerShare": [
                "0",
              ],
              "amount": "0",
              "claimableInterval": "100",
              "farmingToken": "0xA82e5eF8Ca4670a59129aB09Af5c895D5712Fa3b",
              "lastRewardBlock": "2834954",
              "pid": 0,
              "rewardPerBlock": [
                "1",
              ],
              "rewardTokens": [
                "0x1E80A824Ed280c5Ee783D76fdcB634a67C95Edb7",
              ],
              "score": "256000000000000000000",
              "stable": false,
              "startBlock": "2834954",
            },
            {
              "accRewardPerShare": [
                "0",
              ],
              "amount": "0",
              "claimableInterval": "100",
              "farmingToken": "0x4348d845DB2BEbE0eC9F736a89b8266370c78D3c",
              "lastRewardBlock": "2834954",
              "pid": 1,
              "rewardPerBlock": [
                "1",
              ],
              "rewardTokens": [
                "0x1E80A824Ed280c5Ee783D76fdcB634a67C95Edb7",
              ],
              "score": "11000000000000000000",
              "stable": false,
              "startBlock": "2834954",
            },
          ],
          "standardPoolTotalScore": "267000000000000000000",
        },
        "projectInfo": {
          "projectRewards": [
            {
              "amount": "501111",
              "pid": 0,
              "token": "0x233",
            },
          ],
        },
      }
    `)
  })
})
