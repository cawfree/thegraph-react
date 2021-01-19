import { NormalizedCacheObject } from '@apollo/client';
import * as React from 'react';

import { Chains, TheGraphContextValue } from '../types';

const defaultValue: TheGraphContextValue = {
  chain: Chains.MAINNET,
  subgraphs: [],
  clients: {},
};

export default React.createContext<TheGraphContextValue>(defaultValue);
