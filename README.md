<h1 align='center'>
<samp>gauge-result</samp>
</h1>

<p align='center'>
  <samp>Generate gauge result from provided chainName</samp>
</p>

### Install as dependency

```bash
npm i @utkjs/farming-rate-query
```

## Usage

```ts
import { generateGaugeResult } from '@utkjs/farming-rate-query'

// only fech result from current periodId
const result1 = await generateGaugeResult(ChainName.Moonbase)

// fetch result from specific periodId
const result2 = await generateGaugeResult(ChainName.Moonbase, {
  periodId: 0
})

// fetch result from specific periodId and get contract call parameters
const result2 = await generateGaugeResult(ChainName.Moonbase, {
  periodId: 0,
  generateContractCallParameters: true
})
```
