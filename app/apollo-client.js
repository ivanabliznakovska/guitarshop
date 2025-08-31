// app/apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql-api-brown.vercel.app/api/graphql", 
  }),
  cache: new InMemoryCache(),
});
