import { gql } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ICategoryData, IMasterData, IProductData, ISchemaSubmitProductForm } from "../../components";
import { AuthorizationCode, ErrorMessage, ErrorType, IProductFilterProps, productLimit } from "../../shared";
import { wrapperApolloClient } from "../client";

const queryProductPage = gql`
  query getProductPage($productFilter: products_bool_exp!, $limit: Int!, $offset: Int!, $order: [products_order_by!]) {
    products(where: $productFilter, limit: $limit, offset: $offset, order_by: $order) {
      id
      code
      name
      description
      images
      price
      categoryId
      brandId
      htmlContent
      category {
        name
        code
        icon
      }
      brand {
        data
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

    master_data(where: { type: { _eq: "brand" } }) {
      id
      type
      data
    }
  }
`;

const mutateAddProduct = gql`
  mutation mutateAddProduct($object: products_insert_input!) {
    insert_products_one(object: $object) {
      id
    }
  }
`;

const mutateUpdateProduct = gql`
  mutation updateProduct($id: uuid!, $set: products_set_input!) {
    update_products(where: { id: { _eq: $id } }, _set: $set) {
      affected_rows
    }
  }
`;

export const getDataProductAdminPage = async ({
  page,
  sortBy,
  sortOrder,
  category,
  search,
  token,
}: IProductFilterProps) => {
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

    const result = await wrapperApolloClient(token as string).query({
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

    if (result.errors?.length && result.errors[0].extensions?.code === AuthorizationCode.AccessDenied)
      return Promise.reject(AuthorizationCode.AccessDenied);

    return {
      products: result.data["products"] as IProductData[],
      totalProduct: result.data["products_aggregate"]["aggregate"]["count"] as number,
      categories: result.data["categories"] as ICategoryData[],
      brand: result.data["master_data"] as IMasterData[],
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addProduct = async (payload: ISchemaSubmitProductForm, token: string) => {
  try {
    const result = await wrapperApolloClient(token).mutate<Record<"insert_products_one", IProductData>>({
      mutation: mutateAddProduct,
      variables: {
        object: payload,
      },
    });

    return result.data?.insert_products_one as IProductData;
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

export const updateProduct = async (payload: Partial<ISchemaSubmitProductForm>, id: string, token: string) => {
  try {
    const result = await wrapperApolloClient(token).mutate<Record<"update_products", Record<"affected_rows", number>>>({
      mutation: mutateUpdateProduct,
      variables: {
        id,
        set: payload,
      },
    });

    return result.data?.update_products.affected_rows as number;
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
