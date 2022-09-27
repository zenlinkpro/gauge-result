import type { JsonRpcProvider } from '@ethersproject/providers'

export enum ChainName {
  Moonbase = 'Moonbase',
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

export interface ChainConfig {
  networkId: NetworkId
  chainId: ChainId
  chainName: ChainName
  rpc: string
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
  gaugeAddress: string
  multicallAddress: string
  farmingAddress: string
  periodId?: number
  provider: JsonRpcProvider
}

export interface PoolInfoFromContract {
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

export interface GaugePoolInfo extends PoolInfoFromContract {
  pid: number
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

