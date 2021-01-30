# thegraph-react

![https://camo.githubusercontent.com/0f9fcc0ac1b8617ad4989364f60f78b2d6b32985ad6a508f215f14d8f897b8d3/68747470733a2f2f62616467656e2e6e65742f62616467652f547970655363726970742f7374726963742532302546302539462539322541412f626c7565](https://camo.githubusercontent.com/0f9fcc0ac1b8617ad4989364f60f78b2d6b32985ad6a508f215f14d8f897b8d3/68747470733a2f2f62616467656e2e6e65742f62616467652f547970655363726970742f7374726963742532302546302539462539322541412f626c7565)

⚛️  Build decentralized applications quickly and cheaply on [**Ethereum**](https://ethereum.org/en/) and [**IPFS**](https://ipfs.io/) using [**GraphQL**](https://www.apollographql.com/).

Compatible with both [**React**](https://reactjs.org) and [**React Native**](https://reactnative.dev)!

## 🚀 Getting Started

Using [**yarn**](https://yarnpkg.com):

```sh
yarn add thegraph-react
```

You'll also need to manually supply install the following dependencies:

```sh
@apollo/client
graphql
nanoid
```

## ✍️ Usage

```typescript
import { gql } from "@apollo/client";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chains, Subgraph, Subgraphs, TheGraphProvider, useCreateSubgraph, useSubgraph } from "thegraph-react";

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

export default function App(): JSX.Element {
  const aave = useCreateSubgraph({
    [Chains.MAINNET]: 'https://api.thegraph.com/subgraphs/name/aave/protocol',
  });

  const subgraphs = React.useMemo((): Subgraphs => {
    return [aave];
  }, [aave]);

  return (
    <TheGraphProvider chain={Chains.MAINNET} subgraphs={subgraphs}>
      <Aave aave={aave} />
    </TheGraphProvider>
  );
}
```

## ✌️ License
[**MIT**](./LICENSE)
