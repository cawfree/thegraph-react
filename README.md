# thegraph-react
⚛️  Helping build decentralized applications quickly on [**Ethereum**](https://ethereum.org/en/) and [**IPFS**](https://ipfs.io/) using GraphQL.

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
import { View, Text } from "react-native";
import { gql } from "@apollo/client";

import GraphProtocolProvider, { createSubgraph, useSubgraph } from "thegraph-react";

const ID_MAKER_DAO_GOVERNANCE = "maker-dao-governance";

const MakerDAOGovernance = createSubgraph(ID_MAKER_DAO_GOVERNANCE, {
  mainnet: "https://api.thegraph.com/subgraphs/name/protofire/makerdao-governance"
});

function VoterRegistries() {
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
```

## ✌️ License
[**MIT**](./LICENSE)
