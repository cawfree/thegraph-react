import { ApolloClientOptions, NormalizedCacheObject } from '@apollo/client';
import { nanoid } from 'nanoid/non-secure';
import * as React from 'react';

import { createSubgraph } from '../constants';
import { Subgraph, SubgraphURIs } from '../types';

export default function useCreateSubgraph(uris: SubgraphURIs, options?: ApolloClientOptions<NormalizedCacheObject>): Subgraph {
  const id = React.useMemo(nanoid, []);
  return React.useMemo<Subgraph>(() => (
    createSubgraph(id, uris, options)
  ), [id, uris, options]);
}
