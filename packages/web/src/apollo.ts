import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";

import { getMainDefinition } from "apollo-utilities";

const httpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any;
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
