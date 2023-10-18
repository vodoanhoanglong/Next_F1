"use server";

import { signIn } from "../../../apis";
import { throwSafeError } from "../../../shared";
import { ILoginFormKeys, ISchemaLoginForm } from "./schema";

export default async function submitAction(formData: ISchemaLoginForm) {
  try {
    const result = await signIn({
      email: formData[ILoginFormKeys.Email],
      password: formData[ILoginFormKeys.Password],
    });

    return {
      isSuccess: true,
      message: "",
      token: result.token,
      refreshToken: result.refreshToken,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: throwSafeError(error).message,
      token: "",
      refreshToken: "",
    };
  }
}
