import { ApolloError, gql } from "@apollo/client";
import { IConfigFormKeys, IMasterData, IMasterDataType, ISchemaSubmitConfigForm } from "../../components";
import { AuthorizationCode, ErrorMessage, ErrorType } from "../../shared";
import { getClient, wrapperApolloClient } from "../client";

const queryDataConfigAdminPage = gql`
  query getData {
    master_data(where: { type: { _in: ["slider", "partner"] } }) {
      id
      type
      data
    }
  }
`;

const updateConfigAdminPage = gql`
  mutation updateConfig($setBanner: master_data_set_input, $setPartner: master_data_set_input) {
    updateBanner: update_master_data(where: { type: { _eq: "slider" } }, _set: $setBanner) {
      affected_rows
    }

    updatePartner: update_master_data(where: { type: { _eq: "partner" } }, _set: $setPartner) {
      affected_rows
    }
  }
`;

export const getDataConfigAdminPage = async () => {
  try {
    const result = await getClient().query({
      query: queryDataConfigAdminPage,
    });

    let banner = [] as string[];
    let partner = [] as string[];

    (result.data["master_data"] as []).forEach((item: IMasterData) => {
      if (item.type === IMasterDataType.Partner) partner = JSON.parse(item.data);
      else if (item.type) banner = JSON.parse(item.data);
    });

    return {
      partner,
      banner,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateConfig = async (payload: Partial<ISchemaSubmitConfigForm>, token: string) => {
  try {
    await wrapperApolloClient(token).mutate<Record<"updateBanner" | "updatePartner", Record<"affected_rows", number>>>({
      mutation: updateConfigAdminPage,
      variables: {
        setBanner: {
          data: JSON.stringify(payload[IConfigFormKeys.Banner]),
        },
        setPartner: {
          data: JSON.stringify(payload[IConfigFormKeys.Partner]),
        },
      },
    });

    return true;
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
