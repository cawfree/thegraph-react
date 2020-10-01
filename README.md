# thegraph-react
⚛️  React bindings for helping build decentralized applications quickly on [**Ethereum**](https://ethereum.org/en/) and [**IPFS**](https://ipfs.io/) using GraphQL.

Compatible with both [**React**](https://reactjs.org) and [**React Native**](https://reactnative.dev).

## 🚀 Getting Started

Using [**yarn**](https://yarnpkg.com):

```
yarn add graphql @apollo/client thegraph-react
```

Using [**npm**](https://npmjs.com):

```
npm i -s graphql @apollo/client thegraph-react
```

## ✍️ Usage

```javascript
import React, { useState } from "react";
import { Text } from "react-native";
import { gql } from "@apollo/client";

import GraphProtocolProvider, { createSubgraph, useSubgraph } from "thegraph-react";

// XXX: Declare a unique identifier for the subgraph.
const ID_MAKER_DAO_GOVERNANCE = "maker-dao-governance";

// XXX: Create the subgraph.
//      You can specify an object of chain urls to support multiple environments.
const MakerDAOGovernance = createSubgraph(ID_MAKER_DAO_GOVERNANCE, {
  mainnet: "https://api.thegraph.com/subgraphs/name/protofire/makerdao-governance"
  // ropsten: "..."
  // rinkeby: "..."
  // goerli: "..."
});

const useMakerDAOGovernance = () => ;

function VoterRegistries() {
  // XXX: Fetch the useQuery hook.
  const { useQuery } = useSubgraph(ID_MAKER_DAO_GOVERNANCE);
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
  // XXX: Define an array of active subgraphs.
  const [subgraphs] = useState([
    MakerDAOGovernance(),
    // Aave(), Gnosis() etc.
  ]);
  // XXX: Use a provider to declare the subgraphs and chain.
  return (
    <GraphProtocolProvider subgraphs={subgraphs} chain="mainnet">
      <VoterRegistries />
    </GraphProtocolProvider>
  );
}
```

## ✌️ License
[**MIT**](./LICENSE)
