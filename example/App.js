import React, { useState } from "react";
import { View, Text } from "react-native";
import { gql } from "@apollo/client";

import GraphProtocolProvider, { createSubgraph, useSubgraph } from "thegraph-react";

const ID_MAKER_DAO_GOVERNANCE = "maker-dao-governance";

const MakerDAOGovernance = createSubgraph(ID_MAKER_DAO_GOVERNANCE, {
  mainnet: "https://api.thegraph.com/subgraphs/name/protofire/makerdao-governance"
});

const useMakerDAOGovernance = () => useSubgraph(ID_MAKER_DAO_GOVERNANCE);

function VoterRegistries() {
  const { useQuery } = useMakerDAOGovernance();
  const { loading, data, error } = useQuery(gql`
{
  voterRegistries(first: 5) {
    id
    coldAddress
    hotAddress
    voteProxies {
      id
    }
  }
}
  `);
  return (
    <Text children={JSON.stringify(data)} />
  );
}

export default function App() {
  const [subgraphs] = useState([MakerDAOGovernance()]);
  return (
    <GraphProtocolProvider
      subgraphs={subgraphs}
      chain="mainnet"
    >
      <VoterRegistries />
    </GraphProtocolProvider>
  );
}
