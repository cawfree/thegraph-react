import { ApolloClientOptions, NormalizedCacheObject } from "@apollo/client";

import { Subgraph, SubgraphURIs } from "../types";

export default function createSubgraph(
  id: string,
  uris: SubgraphURIs,
  options?: ApolloClientOptions<NormalizedCacheObject>,
): Subgraph {
  return Object.freeze({ id, uris, options });
}
