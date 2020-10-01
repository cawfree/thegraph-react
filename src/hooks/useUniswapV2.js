import { useSubgraph } from ".";
import { ID_SUBGRAPH_UNISWAP_V2 } from "../constants";

export default function useUniswapV2() {
  return useSubgraph(ID_SUBGRAPH_UNISWAP_V2);
}
