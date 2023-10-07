import { gql } from "@apollo/client";
import { IBlogData } from "../../components";
import { INewsDetailFilterProps, blogLimit } from "../../shared";
import { getClient } from "../client";

const queryDataNewsDetailPage = gql`
  query getData($newsId: uuid!, $limit: Int!, $offset: Int!) {
    blogs(where: { id: { _eq: $newsId } }) {
      id
      title
      description
      content
      banner
      createdAt
      type {
        data
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
      creator {
        fullName
        avatar
      }
    }
  }
`;

export const getDataNewsDetailPage = async ({ page, newsId }: INewsDetailFilterProps) => {
  try {
    const result = await getClient().query({
      query: queryDataNewsDetailPage,
      variables: {
        newsId,
        limit: blogLimit,
        offset: (page - 1) * blogLimit,
      },
    });

    const blog = result.data["blogs"][0] as IBlogData;

    const totalRelationBlog = (blog.type as any)["blogs_aggregate"]["aggregate"]["count"] as number;
    const relationBlogs = blog.type.blogs;

    return {
      blog,
      relationBlogs,
      totalRelationBlog,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
