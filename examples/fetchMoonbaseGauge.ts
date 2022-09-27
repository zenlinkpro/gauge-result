/* eslint-disable no-console */
import { generateFarmingParameters } from '../src'
import { ChainName } from '../src/types'

const result = await generateFarmingParameters(ChainName.Moonbase)

console.log('result', JSON.stringify(result, null, 2))
