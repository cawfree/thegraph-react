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
