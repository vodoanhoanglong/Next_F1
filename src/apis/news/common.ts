import { gql } from "@apollo/client";
import { IBlogData } from "../../components";
import { IPaginationProps, blogLimit } from "../../shared";
import { getClient } from "../client";

const queryDataNewsPage = gql`
  query getData($limit: Int!, $offset: Int!) {
    blogs(order_by: { createdAt: desc }, limit: $limit, offset: $offset) {
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

    blogs_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const getDataNewsPage = async ({ page }: IPaginationProps) => {
  try {
    const result = await getClient().query({
      query: queryDataNewsPage,
      variables: {
        limit: blogLimit,
        offset: (page - 1) * blogLimit,
      },
    });

    return {
      blogs: result.data["blogs"] as IBlogData[],
      totalBlog: result.data["blogs_aggregate"]["aggregate"]["count"] as number,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
