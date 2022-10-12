import { describe, expect, it } from 'vitest'
import { generateGaugeResult } from '../src'
import { ChainName } from '../src/types'

describe('chore', () => {
  it('generate gauge result from moonbase period 0', async () => {
    expect(
      await generateGaugeResult(ChainName.Moonbase, {
        periodId: 0,
        generateContractCallParameters: true,
      }),
    ).toMatchInlineSnapshot(`
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
            "pid": 0,
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
                "description": "...",
                "token": "0xB5989e3Eb10bBe04b962586910C0bBC1238baD78",
                "type": "basic",
              },
              {
                "amount": "20000",
                "description": "...",
                "pid": 0,
                "token": "0x1E80A824Ed280c5Ee783D76fdcB634a67C95Edb7",
                "type": "fundation",
              },
              {
                "amount": "30000000000000000",
                "description": "...",
                "pid": 0,
                "token": "0xB5989e3Eb10bBe04b962586910C0bBC1238baD78",
                "type": "project",
              },
            ],
          },
          {
            "pid": 1,
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
                "description": "...",
                "token": "0xB5989e3Eb10bBe04b962586910C0bBC1238baD78",
                "type": "basic",
              },
            ],
          },
        ],
        "chainName": "Moonbase",
        "contractCallParameters": [
          {
            "method": "set",
            "parameters": [
              0,
              [
                "20000",
              ],
              true,
            ],
            "pid": 0,
          },
          {
            "method": "set",
            "parameters": [
              1,
              [
                "0",
              ],
              true,
            ],
            "pid": 1,
          },
        ],
        "error": undefined,
        "exactPeriodId": 0,
        "stablePoolTotalScore": "0",
        "standardPoolTotalScore": "146307600000000000000",
        "totalScore": "146307600000000000000",
      }
    `)
  })

  it('generate gauge result from moonbase period 1', async () => {
    expect(
      await generateGaugeResult(ChainName.Moonbase, {
        periodId: 1,
      }),
    ).toMatchInlineSnapshot(`
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
            "score": "122000000000000000000",
            "stable": false,
            "startBlock": "2834954",
          },
        ],
        "allPoolRewards": [
          {
            "pid": 0,
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
              "score": "122000000000000000000",
              "stable": false,
              "startBlock": "2834954",
            },
            "rewards": [
              {
                "amount": "80000000000000000",
                "description": "...",
                "token": "0xB5989e3Eb10bBe04b962586910C0bBC1238baD78",
                "type": "basic",
              },
            ],
          },
        ],
        "chainName": "Moonbase",
        "contractCallParameters": null,
        "error": undefined,
        "exactPeriodId": 1,
        "stablePoolTotalScore": "0",
        "standardPoolTotalScore": "122000000000000000000",
        "totalScore": "122000000000000000000",
      }
    `)
  })

  it('generate gauge result from moonbase period 2', async () => {
    expect(
      await generateGaugeResult(ChainName.Moonbase, {
        periodId: 2,
      }),
    ).toMatchInlineSnapshot(`
      {
        "allPoolInfos": [
          {
            "accRewardPerShare": [
              "0",
            ],
            "amount": "256000000000000000000",
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
            "pid": 0,
            "pool": {
              "accRewardPerShare": [
                "0",
              ],
              "amount": "256000000000000000000",
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
                "description": "...",
                "token": "0xB5989e3Eb10bBe04b962586910C0bBC1238baD78",
                "type": "basic",
              },
            ],
          },
        ],
        "chainName": "Moonbase",
        "contractCallParameters": null,
        "error": undefined,
        "exactPeriodId": 2,
        "stablePoolTotalScore": "0",
        "standardPoolTotalScore": "256000000000000000000",
        "totalScore": "256000000000000000000",
      }
    `)
  })
})
