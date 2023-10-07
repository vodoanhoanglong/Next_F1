import { gql } from "@apollo/client";
import { IMasterData, IMasterDataType } from "../../components";
import { getClient } from "../client";

const queryDataAboutPage = gql`
  query getData {
    master_data(where: { type: { _in: ["introduction", "partner"] } }) {
      id
      type
      data
      additionalValue
    }
  }
`;

export const getDataAboutPage = async () => {
  try {
    const result = await getClient().query({
      query: queryDataAboutPage,
    });

    let introduction = {} as IMasterData;
    let partner = [] as IMasterData[];

    (result.data["master_data"] as []).forEach((item: IMasterData) => {
      if (item.type === IMasterDataType.Partner) partner.push(item);
      else if (item.type) introduction = item;
    });

    return {
      partner,
      introduction,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
