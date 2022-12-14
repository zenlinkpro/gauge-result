import type { ChainConfig } from './types'
import { ChainId, ChainName, EthereumChainId, NetworkId } from './types'

export const MOONBASE_CHAIN_CONFIG: ChainConfig = {
  networkId: NetworkId.TestNet,
  chainId: ChainId.Moonbase,
  ethereumChainId: EthereumChainId.Moonbase,
  chainName: ChainName.Moonbase,
  rpc: 'https://rpc.api.moonbase.moonbeam.network',
  graphqlEndpoint: 'https://squid.subsquid.io/zenlink-moonbase-squid/graphql',
  multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
  gaugeAddress: '0xA12e750486A6edfA30AEaF168AED6689E2c09913',
  farmingAddress: '0x7291df5772AfCbCB937b3c45723Cd384d39A3CC7',
}

export const CHAIN_CONFIGS = {
  [ChainName.Moonbase]: MOONBASE_CHAIN_CONFIG,
}

export const chainsForWagmi = [
  {
    id: EthereumChainId.Moonbase,
    name: ChainName.Moonbase,
    network: ChainName.Moonbase.toLowerCase(),
    nativeCurrency: { name: 'Moonbase-dev', symbol: 'DEV', decimals: 18 },
    rpcUrls: {
      default: MOONBASE_CHAIN_CONFIG.rpc,
    },
    multicall: {
      address: MOONBASE_CHAIN_CONFIG.multicallAddress,
      blockCreated: 1207735,
    },
  },
]
