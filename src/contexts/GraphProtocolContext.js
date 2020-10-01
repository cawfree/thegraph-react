import { createContext } from "react";

export const defaultContext = Object.freeze({
  chain: "mainnet",
  subgraphs: [],
});

const GraphProtocolContext = createContext(defaultContext);

export default GraphProtocolContext;
