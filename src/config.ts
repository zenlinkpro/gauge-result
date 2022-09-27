import { ChainId, ChainName, NetworkId } from './types'

export interface ChainConfig {
  networkId: number
  chainId: number
  chainName: string
  rpcUrls?: string[]
  multicall?: string
  gaugeAddress: string
}

export const MoonbaseChainConfig: ChainConfig = {
  networkId: NetworkId.TestNet,
  chainId: ChainId.Moonbase,
  chainName: ChainName.Moonbase,
  rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
  multicall: '0xa319aAb7b9578c2CdEe4EE9e4FFE5B5c48157cA3',
  gaugeAddress: '0xA12e750486A6edfA30AEaF168AED6689E2c09913',
}

export const MoonriverChainConfig: ChainConfig = {
  networkId: NetworkId.Kusama,
  chainId: ChainId.Moonriver,
  chainName: ChainName.Moonriver,
  rpcUrls: ['https://rpc.moonriver.moonbeam.network'],
  multicall: '0x959b76B30f12C6Ad3F3C59611F5377d44A704208',
  gaugeAddress: '0xe0F74accE55F4Bb97e738a4d4792d9bb2EC2aF7f',
}

export const MoonbeamChainConfig: ChainConfig = {
  networkId: NetworkId.Polkadot,
  chainId: ChainId.Moombeam,
  chainName: ChainName.Moonbeam,
  rpcUrls: ['https://moonbeam.api.onfinality.io/public'],
  multicall: '0x69573274171d435cdd0aa1Bc8709253D67ac0a29',
  gaugeAddress: '0xe0F74accE55F4Bb97e738a4d4792d9bb2EC2aF7f',
}

export const AstarChainConfig: ChainConfig = {
  networkId: NetworkId.Polkadot,
  chainId: ChainId.Astar,
  chainName: ChainName.Astar,
  rpcUrls: ['https://evm.astar.network'],
  multicall: '0xA768070e3e7eb1452De6D454e11Ab55622926F81',
  gaugeAddress: '0xe0F74accE55F4Bb97e738a4d4792d9bb2EC2aF7f',
}

export const FARMING_REWQRD_REPO_URL = 'https://raw.githubusercontent.com/safe-global/safe-apps-sdk/master/'

export const CHAIN_CONFIG_MAP = {
  [ChainName.Moonbase]: MoonbaseChainConfig,
  [ChainName.Moonriver]: MoonriverChainConfig,
  [ChainName.Moonbeam]: MoonbeamChainConfig,
  [ChainName.Astar]: AstarChainConfig,
}

export const GAUGE_ADDRESS: Record<string, string> = {
  [ChainName.Moonbase]: '0xA12e750486A6edfA30AEaF168AED6689E2c09913',
  [ChainName.Moonriver]: '0xe0F74accE55F4Bb97e738a4d4792d9bb2EC2aF7f',
  [ChainName.Moonbeam]: '0xe0F74accE55F4Bb97e738a4d4792d9bb2EC2aF7f',
  [ChainName.Astar]: '0xe0F74accE55F4Bb97e738a4d4792d9bb2EC2aF7f',
}
