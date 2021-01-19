import * as React from 'react';

import { TheGraphContext } from '../contexts';
import type { TheGraphContextValue } from '../types';

export default function useTheGraph(): TheGraphContextValue {
  return React.useContext(TheGraphContext);
}
