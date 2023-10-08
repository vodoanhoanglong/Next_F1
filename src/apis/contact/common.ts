import { gql } from "@apollo/client";
import { getClient } from "../client";

export interface IPayloadCreateContact {
  fullName: string;
  phoneNumber: string;
  email: string;
  metadata: {
    message: string;
  };
}

const mutationCreateContact = gql`
  mutation contact($obj: contacts_insert_input!) {
    insert_contacts_one(object: $obj, on_conflict: { constraint: contacts_phoneNumber_key, update_columns: metadata }) {
      id
    }
  }
`;

export const createContact = async (data: IPayloadCreateContact) => {
  try {
    return getClient().mutate({
      mutation: mutationCreateContact,
      variables: {
        obj: data,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
