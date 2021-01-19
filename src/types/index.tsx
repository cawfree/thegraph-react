import type { ApolloClient, ApolloClientOptions, NormalizedCacheObject } from "@apollo/client";

export enum Chains {
  MAINNET = 'mainnet',
  ROPSTEN = 'ropsten',
  GOERLI = 'goerli',
  RINKEBY = 'rinkeby',
};

export type SubgraphURIs = {
  readonly [k in Chains]?: string;
};

export type CachingStrategy = NormalizedCacheObject;

export type TheGraphCacheOptions = ApolloClientOptions<CachingStrategy>;

export type Subgraph  = {
  readonly id: string;
  readonly uris: SubgraphURIs;
  readonly options?: TheGraphCacheOptions;
};

export type Subgraphs = readonly Subgraph[];

export type TheGraphSubgraphConfig = {
  readonly chain: Chains;
  readonly subgraphs: readonly Subgraph[];
}

export type SubgraphClients = Record<string, ApolloClient<CachingStrategy>>;

export type TheGraphContextValue= TheGraphSubgraphConfig & {
  readonly clients: SubgraphClients;
};
