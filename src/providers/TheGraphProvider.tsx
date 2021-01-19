import { ApolloClient } from "@apollo/client";
import * as React from "react";

import { TheGraphContext } from '../contexts';
import { useTheGraph } from '../hooks';
import type { CachingStrategy, Subgraph, SubgraphClients, Subgraphs, TheGraphContextValue, TheGraphSubgraphConfig } from '../types';

export type TheGraphProviderProps = TheGraphSubgraphConfig & { 
  readonly children?: JSX.Element | readonly JSX.Element[];
};

export default function TheGraphProvider({
  chain,
  subgraphs,
  children,
}: TheGraphProviderProps): JSX.Element {
  const nextClients = React.useMemo((): SubgraphClients => {
    return subgraphs.reduce(
      (e, { id, options, uris }: Subgraph) => ({
        ...e,
        // @ts-ignore
        [id]: new ApolloClient<CachingStrategy>({ ...options, uri: uris[chain] }),
      }), {});
  }, [subgraphs, chain]);
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
