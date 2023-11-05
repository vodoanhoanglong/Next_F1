import { gql } from "@apollo/client";
import { IContactData } from "../../components";
import { IPaginationProps, contactLimit } from "../../shared";
import { getClient } from "../client";

const queryDataContactAdminPage = gql`
  query getData($limit: Int!, $offset: Int!) {
    contacts(order_by: { updatedAt: desc }, limit: $limit, offset: $offset) {
      id
      email
      phoneNumber
      fullName
      metadata
    }

    contacts_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const getDataContactAdminPage = async ({ page }: IPaginationProps) => {
  try {
    const result = await getClient().query({
      query: queryDataContactAdminPage,
      variables: {
        limit: contactLimit,
        offset: (page - 1) * contactLimit,
      },
    });

    return {
      contacts: result.data["contacts"] as IContactData[],
      totalContacts: result.data["contacts_aggregate"]["aggregate"]["count"] as number,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
