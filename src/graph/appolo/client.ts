import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'cross-fetch'
import { CHAIN_CONFIGS } from '../../config'
import { ChainName } from '../../types'

export const moonbaseClient = new ApolloClient({
  link: new HttpLink({
    uri: CHAIN_CONFIGS[ChainName.Moonbase].graphqlEndpoint,
    fetch,
  }),
  cache: new InMemoryCache(),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export const CLIENTS = {
  [ChainName.Moonbase]: moonbaseClient,
}
