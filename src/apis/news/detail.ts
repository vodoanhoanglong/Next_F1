import { gql } from "@apollo/client";
import { IBlogData, IProductData } from "../../components";
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

    relationProducts: products(
      order_by: { createdAt: desc }
      limit: 10
      offset: 0
      where: { status: { _eq: "active" } }
    ) {
      id
      code
      images
      name
      price
      description
      category {
        id
        code
        name
        icon
      }
      brand {
        data
      }
    }

    totalRelationProducts: products_aggregate(
      limit: 10
      offset: 0
      where: { status: { _eq: "active" } }
    ) {
      aggregate {
        count
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
    const relationProducts = result.data["relationProducts"] as IProductData[];
    const totalRelationProducts = result.data["totalRelationProducts"] as number;

    return {
      blog,
      relationBlogs,
      totalRelationBlog,
      relationProducts,
      totalRelationProducts,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
