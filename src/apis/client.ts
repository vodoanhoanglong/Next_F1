import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { LocalStorage } from "../shared";

const serverUrl = process.env.API_ENDPOINT;
const guestToken = process.env.GUST_TOKEN;

const graphqlUrl = new HttpLink({
  uri: serverUrl,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:
        typeof window !== "undefined" ? `${localStorage.getItem(LocalStorage.Token) || guestToken}` : guestToken,
    },
  };
});

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
