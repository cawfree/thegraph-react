import { InMemoryCache } from "@apollo/client";

const defaultOptions = Object.freeze({
  cache: new InMemoryCache(),
});

export default function createSubgraph(name, uris) {
  if (typeof name !== 'string' || !name.length) {
    throw new Error(`Expected non-empty String name, encountered ${JSON.stringify(name)}.`);
  } else if (!uris || typeof uris !== "object") {
    throw new Error(`Expected Object uris, encountered ${JSON.stringify(uris)}.`);
  } else if (!Object.keys(uris).length) {
    throw new Error(`A subgraph must define at least a single uri.`);
  }

  return (options = defaultOptions) => {
    function Subgraph() {
      return { ...defaultOptions, ...options, uris };
    }
    Subgraph.toString = function() {
      return name;
    };
    return Subgraph;
  };
}
