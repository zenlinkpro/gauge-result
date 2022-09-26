export interface GaugePoolInfo {
  pid: number
  score: number
  poolInfo: any
}

export interface GaugeRewards {
  token: string
  amount: number | string
}

export interface ProjectRewards {
  pid: number
  token: string
  amount: number | string
}
export interface FoundationParam {
  gaugeAddress: string
  rpc: string
  multicall: string
}

export interface ProjectParam {
  gaugeAddress: string
  rpc: string
  multicall: string
}

export interface FarmingRateResult {
  chainName: string
  gaugeInfo: any
  projectInfo: any
  foundationInfo: any
}

export enum ChainName {
  Moonbase = 'Moonbase',
  Moonbeam = 'Moonbeam',
  Moonriver = 'Moonriver',
  Astar = 'Astar',
}

export enum NetworkId {
  Polkadot = 300,
  Kusama = 200,
  TestNet = 100,
}

export enum ChainId {
  Moonbase = 1002,
  Moonriver = 2023,
  Moombeam = 2004,
  Astar = 2006,
}

export enum RateType {
  Gauge = 'Gauge',
  Project = 'Project',
  Foundation = 'Foundation',
}
