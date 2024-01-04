import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { guestToken } from "../shared";

const serverUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

const graphqlUrl = new HttpLink({
  uri: serverUrl,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-Hasura-Admin-Secret": guestToken,
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

export function wrapperApolloClient(authorization: string) {
  const authenticationLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization,
      "X-Hasura-Admin-Secret": guestToken,
    },
  }));

  const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authenticationLink.concat(graphqlUrl),
      defaultOptions,
    });
  });

  return getClient();
}
