import { gql } from "@apollo/client";
import { IProductData } from "../../components";
import { IProductDetailFilterProps, relationProductLimit } from "../../shared";
import { getClient } from "../client";

const queryProductDetailPage = gql`
  query getProductPage($productCode: String!, $categoryCode: String!, $limit: Int!, $offset: Int!) {
    products(where: { code: { _eq: $productCode } }) {
      id
      code
      images
      name
      price
      description
      htmlContent
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

    relationProducts: products(
      order_by: { createdAt: desc }
      limit: $limit
      offset: $offset
      where: { code: { _neq: $productCode }, category: { code: { _eq: $categoryCode } } }
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
      limit: $limit
      offset: $offset
      where: { code: { _neq: $productCode }, category: { code: { _eq: $categoryCode } } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const getDataProductDetailPage = async ({ page, categoryCode, productCode }: IProductDetailFilterProps) => {
  try {
    const result = await getClient().query({
      query: queryProductDetailPage,
      variables: {
        productCode,
        categoryCode,
        limit: relationProductLimit,
        offset: (page - 1) * relationProductLimit,
      },
    });

    return {
      product: result.data["products"][0] as IProductData,
      relationProducts: result.data["relationProducts"] as IProductData[],
      totalRelationProducts: result.data["totalRelationProducts"]["aggregate"]["count"] as number,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
