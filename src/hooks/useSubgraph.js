import { useContext, useCallback } from "react";
import {
  useQuery as gqlUseQuery,
  useLazyQuery as gqlUseLazyQuery,
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
  const useLazyQuery = useCallback(query => gqlUseLazyQuery(query), [client]);

  return {
    useQuery,
    useLazyQuery,
  };
}
