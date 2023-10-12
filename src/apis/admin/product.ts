import { gql } from "@apollo/client";
import { ICategoryData, IProductData } from "../../components";
import { IProductFilterProps, productLimit } from "../../shared";
import { getClient } from "../client";

const queryProductPage = gql`
  query getProductPage($productFilter: products_bool_exp!, $limit: Int!, $offset: Int!, $order: [products_order_by!]) {
    products(where: $productFilter, limit: $limit, offset: $offset, order_by: $order) {
      id
      code
      name
      description
      images
      price
      category {
        name
        code
        icon
      }
    }

    products_aggregate(where: $productFilter) {
      aggregate {
        count
      }
    }

    categories(order_by: { createdAt: desc }) {
      id
      name
      code
      description
      image
      icon
    }
  }
`;

export const getDataProductAdminPage = async ({ page, sortBy, sortOrder, category, search }: IProductFilterProps) => {
  try {
    const productFilter = {
      ...(category?.length
        ? {
            category: {
              code: {
                _in: category,
              },
            },
          }
        : null),

      ...(search
        ? {
            _or: [
              {
                code: { _ilike: `%${search}%` },
              },
              {
                name: { _ilike: `%${search}%` },
              },
              {
                description: { _ilike: `%${search}%` },
              },
            ],
          }
        : null),
    };

    const result = await getClient().query({
      query: queryProductPage,
      variables: {
        productFilter,
        limit: productLimit,
        offset: (page - 1) * productLimit,
        order: [
          sortBy
            ? {
                [sortBy]: sortOrder,
              }
            : {
                createdAt: "desc",
              },
        ],
      },
    });

    return {
      products: result.data["products"] as IProductData[],
      totalProduct: result.data["products_aggregate"]["aggregate"]["count"] as number,
      categories: result.data["categories"] as ICategoryData[],
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
