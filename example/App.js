import React, { useState } from "react";
import { 
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { gql } from "@apollo/client";

import GraphProtocolProvider, { Gnosis, useGnosis } from "./lib";

const styles = StyleSheet.create({
  error: { color: "red" },
});

function CurrentTokenPrice () {
  const { useQuery } = useGnosis();
  const { loading, error, data } = useQuery(
    gql`
{
  prices(first: 5) {
    id
    token {
      id
    }
    batchId
    priceInOwlNumerator
  }
}
    `,
  );
  if (loading) {
    return <ActivityIndicator />;
  } else if (error) {
    return <Text children={JSON.stringify(error)}/>
  }
  return (
    <>
      <Text children={JSON.stringify(data)} />
    </>
  );
}

function LazyCurrentTokenPrice () {
  const { useLazyQuery } = useGnosis();
  const [getCurrentTokenPrice, { loading, error, data }] = useLazyQuery(
    gql`
{
  prices(first: 5) {
    id
    token {
      id
    }
    batchId
    priceInOwlNumerator
  }
}
    `,
  );
  if (loading) {
    return <ActivityIndicator />;
  } else if (error) {
    return <Text children={JSON.stringify(error)}/>
  }
  return (
    <>
      <Text children={JSON.stringify(data)} />
      <TouchableOpacity
        onPress={getCurrentTokenPrice}
      >
        <Text children="get" />
      </TouchableOpacity>
    </>
  );
}

export default function App() {
  const [subgraphs] = useState([Gnosis()]);
  return (
    <GraphProtocolProvider
      subgraphs={subgraphs}
      chain="mainnet"
    >
      <CurrentTokenPrice />
      <LazyCurrentTokenPrice />
    </GraphProtocolProvider>
  );
}
