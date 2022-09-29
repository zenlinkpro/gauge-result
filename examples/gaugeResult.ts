/* eslint-disable no-console */
import { generateGaugeResult } from '../src'
import { ChainName } from '../src/types'

const result = await generateGaugeResult(ChainName.Moonbase, {
  generateContractCallParameters: true,
})

console.log('result', JSON.stringify(result, null, 2))
