import { gql } from "@apollo/client";

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
    // const response = await getClient().mutate<Record<string, IResponseAuthentication>>({
    //   mutation: mutationSignIn,
    //   variables: {
    //     form: data,
    //   },
    // });

    return {
      refreshToken: process.env.NEXT_PUBLIC_GUST_TOKEN,
      token: process.env.NEXT_PUBLIC_GUST_TOKEN,
    } as IResponseAuthentication;
  } catch (error) {
    return Promise.reject(error);
  }
};
