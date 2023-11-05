import { ApolloError, gql } from "@apollo/client";
import { IMasterData } from "../../components";
import { AuthorizationCode, ErrorMessage, ErrorType } from "../../shared";
import { wrapperApolloClient } from "../client";

const mutateUpdateAbout = gql`
  mutation updateAbout($set: master_data_set_input!) {
    update_master_data(where: { type: { _eq: "introduction" } }, _set: $set) {
      affected_rows
    }
  }
`;

export const updateAbout = async (payload: IMasterData, token: string) => {
  try {
    const result = await wrapperApolloClient(token).mutate<
      Record<"update_master_data", Record<"affected_rows", number>>
    >({
      mutation: mutateUpdateAbout,
      variables: {
        set: payload,
      },
    });

    return result.data?.update_master_data.affected_rows as number;
  } catch (error) {
    const graphQl = error as ApolloError;
    if (graphQl.graphQLErrors.length) {
      if (graphQl.graphQLErrors[0].extensions?.code === AuthorizationCode.AccessDenied)
        return Promise.reject(AuthorizationCode.AccessDenied);

      if (ErrorMessage[graphQl.graphQLErrors[0].message as ErrorType])
        return Promise.reject(ErrorMessage[graphQl.graphQLErrors[0].message as ErrorType]);
    }

    return Promise.reject(error);
  }
};
