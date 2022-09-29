<h1 align='center'>
<samp>gauge-result</samp>
</h1>

<p align='center'>
  <samp>Generate gauge result from provided chainName</samp>
  <p align="center">
    <a href="https://www.npmjs.com/package/@utkjs/farming-rate-query"></a>
  <img src="https://img.shields.io/npm/v/@utkjs/farming-rate-query?color=f20082&amp;label=" alt="NPM version">
  </p>
  <br>
  <br>
</p>

## Install as dependency

```bash
npm i @utkjs/farming-rate-query
```

## Usage

Generate rewards first if admin need to update config in 'src/rewards' (auto generate before build process)
```bash
pnpm run generate:rewards
```

Fetch results
```ts
import { ChainName, generateGaugeResult } from '@utkjs/farming-rate-query'

// only fech result from current periodId
const result1 = await generateGaugeResult(ChainName.Moonbase)

// fetch result from specific periodId
const result2 = await generateGaugeResult(ChainName.Moonbase, {
  periodId: 0
})

// fetch result from specific periodId and get contract call parameters
const result3 = await generateGaugeResult(ChainName.Moonbase, {
  periodId: 0,
  generateContractCallParameters: true
})
```
