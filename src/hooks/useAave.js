import { useSubgraph } from ".";
import { ID_SUBGRAPH_AAVE } from "../constants";

export default function useAave() {
  return useSubgraph(ID_SUBGRAPH_AAVE);
}
