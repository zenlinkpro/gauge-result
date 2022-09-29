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

export interface BasicReward {
  token: string
  amount: string
}

export interface RewardForPool extends BasicReward {
  pid: number
}

export interface GaugeRewards {
  periodId: number
  rewards: BasicReward[]
}

export interface ExternalRewards {
  periodId: number
  rewards: RewardForPool[]
}

export interface GaugeQueryOptions {
  chainName: ChainName
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

export interface FarmingParametersResult {
  chainName: ChainName
  exactPeriodId: number
  totalScore: string
  standardPoolTotalScore: string
  stablePoolTotalScore: string
  allPoolInfos: GaugePoolInfo[]
  allPoolRewards: {
    pool: GaugePoolInfo
    rewards: BasicReward[]
  }[]
}

