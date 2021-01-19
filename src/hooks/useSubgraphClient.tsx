import { ApolloClient } from '@apollo/client';

import { CachingStrategy, Subgraph } from '../types';

import useTheGraph from './useTheGraph';

export default function useSubgraphClient(subgraph: Subgraph): ApolloClient<CachingStrategy> {
  const { clients } = useTheGraph();
  return clients[subgraph.id];
}
