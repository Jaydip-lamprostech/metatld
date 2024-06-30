import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/71916/base-metatlds/0.0.1", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
