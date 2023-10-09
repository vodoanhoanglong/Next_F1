import { gql } from "@apollo/client";
import { getClient } from "../client";

export interface IPayloadAuthentication {
  fullName?: string;
  email: string;
  password: string;
}

export interface IResponseAuthentication {
  token: string;
  refreshToken: string;
}

const mutationSignIn = gql`
  mutation signIn($form: SignInInput!) {
    signIn(form: $form) {
      token
      refreshToken
    }
  }
`;

export const signIn = async (data: IPayloadAuthentication): Promise<IResponseAuthentication> => {
  try {
    const response = await getClient().mutate<IResponseAuthentication>({
      mutation: mutationSignIn,
      variables: {
        form: data,
      },
    });

    return response.data as IResponseAuthentication;
  } catch (error) {
    return Promise.reject(error);
  }
};
