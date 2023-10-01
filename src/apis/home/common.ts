import { gql } from "@apollo/client";
import { IMasterData, IProductData } from "../../components";
import { IBlogData } from "../../components/blog";
import { getClient } from "../client";

const queryDataHomePage = gql`
  query getData {
    master_data(where: { type: { _in: ["slider", "introduction", "partner"] } }) {
      id
      type
      data
    }

    products(limit: 10, order_by: { createdAt: desc }) {
      id
      code
      name
      description
      images
      price
      category {
        name
        code
      }
    }

    blogs(order_by: { createdAt: desc }, limit: 4) {
      id
      title
      description
      content
      banner
      createdAt
      creator {
        fullName
        avatar
      }
    }
  }
`;

export const getDataHomePage = async () => {
  try {
    const result = await getClient().query({
      query: queryDataHomePage,
    });

    return {
      masterData: result.data["master_data"] as IMasterData[],
      products: result.data["products"] as IProductData[],
      blogs: result.data["blogs"] as IBlogData[],
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
