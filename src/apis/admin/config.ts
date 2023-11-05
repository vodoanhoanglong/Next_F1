import { gql } from "@apollo/client";
import { IMasterData } from "../../components";
import { getClient } from "../client";

const queryDataConfigAdminPage = gql`
  query getData {
    master_data(where: { type: { _eq: "slider" } }) {
      id
      type
      data
    }
  }
`;

export const getDataConfigAdminPage = async () => {
  try {
    const result = await getClient().query({
      query: queryDataConfigAdminPage,
    });

    return {
      slider: result.data["master_data"] as IMasterData[],
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
