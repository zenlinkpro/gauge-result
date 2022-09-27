import type { ChainConfig } from './types'
import { ChainId, ChainName, NetworkId } from './types'

export const MOONBASE_CHAIN_CONFIG: ChainConfig = {
  networkId: NetworkId.TestNet,
  chainId: ChainId.Moonbase,
  chainName: ChainName.Moonbase,
  rpc: 'https://rpc.api.moonbase.moonbeam.network',
  graphqlEndpoint: 'https://squid.subsquid.io/zenlink-moonbase-squid/graphql',
  multicallAddress: '0xa319aAb7b9578c2CdEe4EE9e4FFE5B5c48157cA3',
  gaugeAddress: '0xA12e750486A6edfA30AEaF168AED6689E2c09913',
  farmingAddress: '0x7291df5772AfCbCB937b3c45723Cd384d39A3CC7',
}

export const CHAIN_CONFIGS = {
  [ChainName.Moonbase]: MOONBASE_CHAIN_CONFIG,
}
