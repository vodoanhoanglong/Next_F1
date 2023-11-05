import { ApolloError, gql } from "@apollo/client";
import { IBlogData, IMasterData, ISchemaSubmitBlogForm } from "../../components";
import { AuthorizationCode, ErrorMessage, ErrorType, IPaginationProps, blogLimit } from "../../shared";
import { getClient, wrapperApolloClient } from "../client";

const queryDataBlogAdminPage = gql`
  query getData($limit: Int!, $offset: Int!) {
    blogs(order_by: { createdAt: desc }, limit: $limit, offset: $offset) {
      id
      title
      description
      content
      banner
      createdAt
      typeId
      type {
        data
      }
      creator {
        fullName
        avatar
      }
    }

    tags: master_data(where: { type: { _eq: "blog_tag" } }) {
      id
      data
    }

    blogs_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const mutateUpdateBlog = gql`
  mutation updateBlog($set: blogs_set_input!, $id: uuid!) {
    update_blogs(where: { id: { _eq: $id } }, _set: $set) {
      affected_rows
    }
  }
`;

const mutateAddBlog = gql`
  mutation mutateAddBlog($object: blogs_insert_input!) {
    insert_blogs_one(object: $object) {
      id
    }
  }
`;

export const getDataBlogAdminPage = async ({ page }: IPaginationProps) => {
  try {
    const result = await getClient().query({
      query: queryDataBlogAdminPage,
      variables: {
        limit: blogLimit,
        offset: (page - 1) * blogLimit,
      },
    });

    return {
      blogs: result.data["blogs"] as IBlogData[],
      totalBlog: result.data["blogs_aggregate"]["aggregate"]["count"] as number,
      tags: result.data["tags"] as IMasterData[],
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addBlog = async (payload: ISchemaSubmitBlogForm, token: string) => {
  try {
    const result = await wrapperApolloClient(token).mutate<Record<"insert_blogs_one", IBlogData>>({
      mutation: mutateAddBlog,
      variables: {
        object: payload,
      },
    });

    return result.data?.insert_blogs_one as IBlogData;
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

export const updateBlog = async (payload: Partial<ISchemaSubmitBlogForm>, id: string, token: string) => {
  try {
    const result = await wrapperApolloClient(token).mutate<Record<"update_blogs", Record<"affected_rows", number>>>({
      mutation: mutateUpdateBlog,
      variables: {
        id,
        set: payload,
      },
    });

    return result.data?.update_blogs.affected_rows as number;
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
