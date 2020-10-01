import {
  ID_SUBGRAPH_AAVE,
  ID_SUBGRAPH_GNOSIS,
  ID_SUBGRAPH_UNISWAP_V2,
  createSubgraph,
} from "../constants";

export const Aave = createSubgraph(ID_SUBGRAPH_AAVE, {
  mainnet: "https://api.thegraph.com/subgraphs/name/aave/protocol",
  ropsten: "https://api.thegraph.com/subgraphs/name/aave/protocol-ropsten",
});

export const Gnosis = createSubgraph(ID_SUBGRAPH_GNOSIS, {
  mainnet: "https://api.thegraph.com/subgraphs/name/gnosis/protocol",
  rinkeby: "https://api.thegraph.com/subgraphs/name/gnosis/protocol-rinkeby",
});

export const UniswapV2 = createSubgraph(ID_SUBGRAPH_UNISWAP_V2, {
  mainnet: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  ropsten: "https://api.thegraph.com/subgraphs/name/pollendefi/uniswap-v2-ropsten",
  rinkeby: "https://api.thegraph.com/subgraphs/name/blockrockettech/uniswap-v2-subgraph-rinkeby",
  goerli: "https://api.thegraph.com/subgraphs/name/thegostep/uniswapv2-goerli",
});
