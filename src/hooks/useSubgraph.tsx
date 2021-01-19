import { useQuery as baseUseQuery, DocumentNode, QueryHookOptions, QueryResult, TypedDocumentNode } from "@apollo/client";
import * as React from 'react';

import { Subgraph } from "../types";

import useSubgraphClient from "./useSubgraphClient";

export type useSubgraphResult<TData, TVariables> = {
  readonly useQuery: (query: DocumentNode | TypedDocumentNode<TData, TVariables>, options?: QueryHookOptions<TData, TVariables>) => QueryResult<TData, TVariables>
};

export default function useSubgraph<TData, TVariables>(subgraph: Subgraph): useSubgraphResult<TData, TVariables> {
  const client = useSubgraphClient(subgraph);

  const useQuery = React.useCallback(
    function useQuery<TData, TVariables>(
      query: DocumentNode | TypedDocumentNode<TData, TVariables>,
      options?: QueryHookOptions<TData, TVariables>
    ): QueryResult<TData, TVariables> {
      return baseUseQuery(query, { ...(options || {}), client });
    },
    [client],
  );

  return { useQuery };
}
