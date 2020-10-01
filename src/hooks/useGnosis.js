import { useSubgraph } from ".";
import { ID_SUBGRAPH_GNOSIS } from "../constants";

export default function useGnosis() {
  return useSubgraph(ID_SUBGRAPH_GNOSIS);
}
