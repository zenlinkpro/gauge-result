import { describe, expect, it } from 'vitest'
import { CHAIN_CONFIGS } from '../src/config'
import { fetchGraphGaugeData } from '../src/graph/queries/gauge'
import { ChainName } from '../src/types'

describe('graph', () => {
  it('should get gauge data from moonbase client', async () => {
    const { gaugeAddress } = CHAIN_CONFIGS[ChainName.Moonbase]
    expect(await fetchGraphGaugeData(ChainName.Moonbase, gaugeAddress.toLowerCase(), 0))
      .toMatchInlineSnapshot(`
        {
          "data": {
            "__typename": "Gauge",
            "id": "0xa12e750486a6edfa30aeaf168aed6689e2c09913",
            "periodStates": [
              {
                "__typename": "GaugePeriodState",
                "allPoolStates": [
                  {
                    "__typename": "GaugePoolState",
                    "id": "0-0",
                    "inherit": false,
                    "periodId": 0,
                    "poolId": 0,
                    "resetVotable": true,
                    "score": "114472600000000000000",
                    "timestamp": "1663573530184",
                    "totalAmount": "122000000000000000000",
                    "updatedAt": "2022-09-19T07:45:30.184000Z",
                    "votable": true,
                  },
                  {
                    "__typename": "GaugePoolState",
                    "id": "0-1",
                    "inherit": false,
                    "periodId": 0,
                    "poolId": 1,
                    "resetVotable": true,
                    "score": "31835000000000000000",
                    "timestamp": "1663573554318",
                    "totalAmount": "34000000000000000000",
                    "updatedAt": "2022-09-19T07:45:54.318000Z",
                    "votable": true,
                  },
                  {
                    "__typename": "GaugePoolState",
                    "id": "0-2",
                    "inherit": false,
                    "periodId": 0,
                    "poolId": 2,
                    "resetVotable": true,
                    "score": "0",
                    "timestamp": "1663573494336",
                    "totalAmount": "0",
                    "updatedAt": "2022-09-19T07:44:54.336000Z",
                    "votable": true,
                  },
                ],
                "end": "1663582913",
                "id": "0",
                "start": "1663572913",
                "timestamp": "1663573554318",
                "totalAmount": "156000000000000000000",
                "totalScore": "146307600000000000000",
                "updatedAt": "2022-09-19T07:45:54.318000Z",
              },
            ],
            "timestamp": "1663655988331",
            "updatedAt": "2022-09-20T06:39:48.331000Z",
            "voteToken": "0xb38188fedff30bec23aef5c691ab647756771ff1",
          },
          "error": false,
        }
      `)
  })
})
