import { gql } from '@apollo/client'
import type { ChainName } from '../../types'
import { CLIENTS } from '../appolo/client'

export const GAUGE_FETCH = gql`
  query gaugeQuery($id: String!, $periodId: String) {
    gaugeById(id: $id) {
      id
      voteToken
      timestamp
      updatedAt
      periodStates(where: { id_eq: $periodId }, limit: 1) {
        id
        start
        end
        totalAmount
        totalScore
        timestamp
        updatedAt
        allPoolStates(orderBy: score_DESC, where: { votable_eq: true }) {
          id
          periodId
          poolId
          inherit
          votable
          resetVotable
          totalAmount
          score
          timestamp
          updatedAt
        }
      }
    }
  }
`

interface GaugeGraphResult {
  gaugeById: {
    id: string
    voteToken: string
    timestamp: string
    updatedAt: string
    periodStates: {
      id: string
      start: string
      end: string
      totalAmount: string
      totalScore: string
      timestamp: string
      updatedAt: string
      allPoolStates: {
        id: string
        periodId: number
        poolId: number
        inherit: boolean
        votable: boolean
        resetVotable: boolean
        totalAmount: string
        score: string
        timestamp: string
        updatedAt: string
      }[]
    }[]
  }
}

export async function fetchGraphGaugeData(
  chainName: ChainName,
  gaugeAddress: string,
  periodId: number,
) {
  let data: {
    id: string
    voteToken: string
    timestamp: string
    updatedAt: string
    periodStates: {
      id: string
      start: string
      end: string
      totalAmount: string
      totalScore: string
      timestamp: string
      updatedAt: string
      allPoolStates: {
        id: string
        periodId: number
        poolId: number
        inherit: boolean
        votable: boolean
        resetVotable: boolean
        totalAmount: string
        score: string
        timestamp: string
        updatedAt: string
      }[]
    }[]
  } | null = null

  let error = false

  try {
    const { data: gaugeResData } = await CLIENTS[chainName].query<GaugeGraphResult>({
      query: GAUGE_FETCH,
      variables: {
        id: gaugeAddress,
        periodId: periodId.toString(),
      },
    })
    data = gaugeResData.gaugeById
  }
  catch (e) {
    error = true
  }

  if (data) {
    return {
      data,
      error: false,
    }
  }
  else {
    return {
      data: undefined,
      error,
    }
  }
}
