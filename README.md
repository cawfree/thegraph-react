# thegraph-react
⚛️  Helping build decentralized applications quickly on [**Ethereum**](https://ethereum.org/en/) and [**IPFS**](https://ipfs.io/) using GraphQL.

Compatible with both [**React**](https://reactjs.org) and [**React Native**](https://reactnative.dev).

## 🚀 Getting Started

Using [**yarn**](https://yarnpkg.com):

```
yarn add thegraph-react
```

## ✍️ Usage

```javascript
import { gql, InMemoryCache } from "@apollo/client";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Chains, Subgraph, Subgraphs, TheGraphProvider, useCreateSubgraph, useSubgraph } from './src';

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
});

function Aave({ aave }: {
  readonly aave: Subgraph,
}): JSX.Element {
  const { useQuery } = useSubgraph(aave);
  const { error, loading, data } = useQuery(gql`
  {
    lendingPoolConfigurationHistoryItems(first: 5) {
      id
      provider {
        id
      }
      lendingPool
      lendingPoolCore
    }
    lendingPoolConfigurations(first: 5) {
      id
      lendingPool
      lendingPoolCore
      lendingPoolParametersProvider
    }
  }
  `);
  return (
    <View style={[StyleSheet.absoluteFill, styles.center]}>
      <Text>{(error || loading) ? 'Loading...' : JSON.stringify(data)}</Text>
    </View>
  );
}
```

## ✌️ License
[**MIT**](./LICENSE)
