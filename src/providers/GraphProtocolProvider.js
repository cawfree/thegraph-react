import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { ApolloProvider, ApolloClient } from "@apollo/client";

import { GraphProtocolContext, defaultContext } from "../contexts";

const chainError = (subgraph, chain) => new Error(
  `Missing declaration for the "${subgraph}" subgraph on the "${chain}" chain.`
);

function GraphProtocolProvider({
  chain,
  subgraphs: subgraphConfig,
  children,
}) {
  const createSubgraphs = useCallback(
    (subgraphConfig, chain) => subgraphConfig
      .reduce(
        (obj, createSubgraph) => {
          // TODO: sanitize id
          const id = createSubgraph.toString();
          if (Object.keys(obj).indexOf(id) >= 0) {
            throw new Error(`Attempted to register multiple subgraphs with the id "${id}".`);
          }
          const { uris, ...extras } = createSubgraph();
          if (!uris || typeof uris !== "object") {
            console.warn(chainError(id, chain));
          }
          const { [chain]: uri } = uris;
          if (typeof uri !== "string" || !uri.length) {
            console.warn(chainError(id, chain));
            return obj;
          }
          return { ...obj, [id]: new ApolloClient({ ...extras, uri }) };
        },
        {},
      ),
    [],
  );
  const [subgraphs, setSubgraphs] = useState(() => createSubgraphs(
    subgraphConfig,
    chain,
  ));
  useEffect(
    () => setSubgraphs(createSubgraphs(subgraphConfig, chain)),
    [subgraphConfig, chain, setSubgraphs, createSubgraphs],
  );
  return (
    <GraphProtocolContext.Provider
      value={{
        ...defaultContext,
        subgraphs,
        chain,
      }}
    >
      {Object.values(subgraphs).reduce(
        (children, subgraph, i) => (
          <ApolloProvider key={i} client={subgraph}>{children}</ApolloProvider>
        ),
        <>{children}</>,
      )}
    </GraphProtocolContext.Provider>
  );
}

GraphProtocolProvider.propTypes = {
  chain: PropTypes.string.isRequired,
  subgraphs: PropTypes.arrayOf(PropTypes.func),
};

GraphProtocolProvider.defaultProps = {
  ...defaultContext,
};

export default GraphProtocolProvider;
