/* eslint-disable no-console */
import { queryFarmingRate } from '../src'
import { ChainName } from '../src/types'

const result = await queryFarmingRate(ChainName.Moonbase)

console.log('result', JSON.stringify(result, null, 2))
