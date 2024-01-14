import { gql } from "@apollo/client";
import { ICategoryData, IMasterData } from "../../components";
import { IBlogData } from "../../components/blog";
import { getClient } from "../client";

const queryDataHomePage = gql`
  query getData {
    master_data(where: { type: { _in: ["slider", "introduction", "partner"] } }) {
      id
      type
      data
    }

    categories(order_by: { name: asc }) {
      id
      code
      name
      description
      image
      icon
    }

    blogs(order_by: { createdAt: desc }, limit: 3) {
      id
      title
      description
      content
      banner
      createdAt
      type {
        data
      }
      creator {
        fullName
        avatar
      }
    }
  }
`;

const queryDataCategory = gql`
  query getData {
    categories (order_by: {name: asc}) {
      id
      code
      name
      description
      image
      icon
    }
  }
`;

export const getDataCategoryNavbar = async () => {
  try {
    const result = await getClient().query({
      query: queryDataCategory,
    });

    return result.data["categories"] as ICategoryData[];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDataHomePage = async () => {
  try {
    const result = await getClient().query({
      query: queryDataHomePage,
    });

    return {
      masterData: result.data["master_data"] as IMasterData[],
      categories: result.data["categories"] as ICategoryData[],
      blogs: result.data["blogs"] as IBlogData[],
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
