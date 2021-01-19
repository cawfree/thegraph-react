import { ApolloClient, InMemoryCache } from "@apollo/client";
import * as React from "react";

import { TheGraphContext } from '../contexts';
import { useTheGraph } from '../hooks';
import type { CachingStrategy, Subgraph, SubgraphClients, TheGraphContextValue, TheGraphSubgraphConfig } from '../types';

export type TheGraphProviderProps = TheGraphSubgraphConfig & { 
  readonly children?: JSX.Element | readonly JSX.Element[];
};

export default function TheGraphProvider({
  chain,
  subgraphs,
  children,
}: TheGraphProviderProps): JSX.Element {
  const cache = React.useMemo<InMemoryCache>(() => new InMemoryCache(), []);
  const nextClients = React.useMemo((): SubgraphClients => {
    return subgraphs.reduce(
      (e, { id, options, uris }: Subgraph) => ({
        ...e,
        [id]: new ApolloClient<CachingStrategy>({ ...(!!options && typeof options === 'object' ? options : {}), uri: uris[chain], cache }),
      }), {});
  }, [subgraphs, chain, cache]);
  const parentContext = useTheGraph();
  const value = React.useMemo((): TheGraphContextValue => {
    const { subgraphs: parentSubgraphs, clients: parentClients } = parentContext;
    return {
      chain,
      subgraphs: [...parentSubgraphs, ...subgraphs].filter((e, i, orig) => orig.indexOf(e) === i),
      clients: {
        ...parentClients,
        ...nextClients,
      },
    };
  }, [parentContext, chain, subgraphs, nextClients]);
  return (
    <TheGraphContext.Provider value={value}>
      {children}
    </TheGraphContext.Provider>
  );
}
