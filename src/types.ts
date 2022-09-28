export enum ChainName {
  Moonbase = 'Moonbase',
}

export enum NetworkId {
  TestNet = 100,
  Kusama = 200,
  Polkadot = 300,
}

export enum ChainId {
  Moonbase = 1002,
  Moonriver = 2023,
  Moombeam = 2004,
  Astar = 2006,
}

export enum EthereumChainId {
  Moonbase = 1287,
}

export interface ChainConfig {
  networkId: NetworkId
  chainId: ChainId
  ethereumChainId: EthereumChainId
  chainName: ChainName
  rpc: string
  graphqlEndpoint: string
  multicallAddress: string
  gaugeAddress: string
  farmingAddress: string
}

export enum RateType {
  Gauge = 'Gauge',
  Project = 'Project',
  Foundation = 'Foundation',
}

export interface BasicReward {
  token: string
  amount: string
}

export interface GaugeRewards {
  periodId: number
  rewards: BasicReward[]
}

export interface GaugeQueryOptions {
  rpc: string
  ethereumChainId: EthereumChainId
  gaugeAddress: string
  multicallAddress: string
  farmingAddress: string
  periodId?: number
}

export interface GaugePoolInfo {
  pid: number
  score: string
  stable: boolean
  farmingToken: string
  amount: string
  rewardTokens: string[]
  rewardPerBlock: string[]
  accRewardPerShare: string[]
  lastRewardBlock: string
  startBlock: string
  claimableInterval: string
}

export interface QueryScoreParams {
  multicallAddress: string
  gaugeAddress: string
  rpc: string
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

