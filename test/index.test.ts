import { describe, expect, it } from 'vitest'
import { generateFarmingParameters } from '../src'
import { ChainName } from '../src/types'

describe('chore', () => {
  it('generate farming parameters from moonbase period 0', async () => {
    expect(await generateFarmingParameters(ChainName.Moonbase, 0)).toMatchInlineSnapshot(`
      {
        "allPoolInfos": [
          {
            "accRewardPerShare": [
              "0",
            ],
            "amount": "122000000000000000000",
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
            "score": "114472600000000000000",
            "stable": false,
            "startBlock": "2834954",
          },
          {
            "accRewardPerShare": [
              "0",
            ],
            "amount": "34000000000000000000",
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
            "score": "31835000000000000000",
            "stable": false,
            "startBlock": "2834954",
          },
        ],
        "allPoolRewards": [
          {
            "pool": {
              "accRewardPerShare": [
                "0",
              ],
              "amount": "122000000000000000000",
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
              "score": "114472600000000000000",
              "stable": false,
              "startBlock": "2834954",
            },
            "rewards": [
              {
                "amount": "62592838649530167",
                "token": "0xB5989e3Eb10bBe04b962586910C0bBC1238baD78",
              },
              {
                "amount": "20000000000000000",
                "token": "0xB5989e3Eb10bBe04b962586910C0bBC1238baD78",
              },
              {
                "amount": "30000000000000000",
                "token": "0xB5989e3Eb10bBe04b962586910C0bBC1238baD78",
              },
            ],
          },
          {
            "pool": {
              "accRewardPerShare": [
                "0",
              ],
              "amount": "34000000000000000000",
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
              "score": "31835000000000000000",
              "stable": false,
              "startBlock": "2834954",
            },
            "rewards": [
              {
                "amount": "17407161350469832",
                "token": "0xB5989e3Eb10bBe04b962586910C0bBC1238baD78",
              },
            ],
          },
        ],
        "chainName": "Moonbase",
        "exactPeriodId": 0,
        "stablePoolTotalScore": "0",
        "standardPoolTotalScore": "146307600000000000000",
        "totalScore": "146307600000000000000",
      }
    `)
  })
  it('generate farming parameters from moonbase period 2', async () => {
    expect(await generateFarmingParameters(ChainName.Moonbase, 2)).toMatchInlineSnapshot(`
      {
        "allPoolInfos": [
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
        ],
        "allPoolRewards": [
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
                "amount": "80000000000000000",
                "token": "0xB5989e3Eb10bBe04b962586910C0bBC1238baD78",
              },
            ],
          },
        ],
        "chainName": "Moonbase",
        "exactPeriodId": 2,
        "stablePoolTotalScore": "0",
        "standardPoolTotalScore": "256000000000000000000",
        "totalScore": "256000000000000000000",
      }
    `)
  })
})
