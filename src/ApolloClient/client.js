import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/gql",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});