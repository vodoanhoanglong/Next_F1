import { ApolloError, gql } from "@apollo/client";
import { ICategoryData, ISchemaSubmitCategoryForm } from "../../components";
import { AuthorizationCode, ErrorMessage, ErrorType, ICategoryFilterProps, categoryLimit } from "../../shared";
import { wrapperApolloClient } from "../client";

const queryCategoryPage = gql`
  query getCategoryPage(
    $categoryFilter: categories_bool_exp!
    $limit: Int!
    $offset: Int!
    $order: [categories_order_by!]
  ) {
    categories(where: $categoryFilter, limit: $limit, offset: $offset, order_by: $order) {
      id
      code
      name
      description
      image
      icon
    }

    categories_aggregate(where: $categoryFilter) {
      aggregate {
        count
      }
    }
  }
`;

const mutateAddCategory = gql`
  mutation mutateAddProduct($object: categories_insert_input!) {
    insert_categories_one(object: $object) {
      id
    }
  }
`;

const mutateUpdateCategory = gql`
  mutation updateProduct($id: uuid!, $set: categories_set_input!) {
    update_categories(where: { id: { _eq: $id } }, _set: $set) {
      affected_rows
    }
  }
`;

export const getDataCategoryAdminPage = async ({ page, sortBy, sortOrder, search, token }: ICategoryFilterProps) => {
  try {
    const categoryFilter = {
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
      query: queryCategoryPage,
      variables: {
        categoryFilter,
        limit: categoryLimit,
        offset: (page - 1) * categoryLimit,
        order: [
          sortBy
            ? {
                [sortBy]: sortOrder,
              }
            : {
                updatedAt: "desc",
              },
        ],
      },
    });

    if (result.errors?.length && result.errors[0].extensions?.code === AuthorizationCode.AccessDenied)
      return Promise.reject(AuthorizationCode.AccessDenied);

    return {
      categories: result.data["categories"] as ICategoryData[],
      totalCategories: result.data["categories_aggregate"]["aggregate"]["count"] as number,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addCategory = async (payload: ISchemaSubmitCategoryForm, token: string) => {
  try {
    const result = await wrapperApolloClient(token).mutate<Record<"insert_categories_one", ICategoryData>>({
      mutation: mutateAddCategory,
      variables: {
        object: payload,
      },
    });

    return result.data?.insert_categories_one as ICategoryData;
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

export const updateCategory = async (payload: Partial<ISchemaSubmitCategoryForm>, id: string, token: string) => {
  try {
    const result = await wrapperApolloClient(token).mutate<
      Record<"update_categories", Record<"affected_rows", number>>
    >({
      mutation: mutateUpdateCategory,
      variables: {
        id,
        set: payload,
      },
    });

    return result.data?.update_categories.affected_rows as number;
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
