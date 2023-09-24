import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const serverUrl = "http://data.thchemical.api/v1/graphql";
const guestToken = `u4g70QI}6\dSCELiOor9r&nZ:i25j]:3`;

const graphqlUrl = new HttpLink({
  uri: serverUrl,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: typeof window !== "undefined" ? `${localStorage.getItem("token")}` : guestToken,
  },
}));

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(graphqlUrl),
    defaultOptions,
  });
});
