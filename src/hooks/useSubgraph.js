import { useContext, useCallback } from "react";
import {
  useQuery as gqlUseQuery,
  useLazyQuery as gqlUseLazyQuery,
  useSubscription as gqlUseSubscription,
} from "@apollo/client";

import { GraphProtocolContext } from "../contexts";

export default function useSubgraph(name) {
  const { subgraphs } = useContext(GraphProtocolContext);
  const { [name]: client } = subgraphs;

  const useQuery = useCallback(
    (query, options = {}) => gqlUseQuery(query, {
      ...options,
      client,
    }),
    [client],
  );
  const useLazyQuery = useCallback(
    (query, options = {}) => gqlUseLazyQuery(
      query,
      {
        client,
        ...options,
      },
    ),
    [client],
  );

  return {
    useQuery,
    useLazyQuery,
  };
}
