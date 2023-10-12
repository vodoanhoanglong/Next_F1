"use server";

import { signIn } from "../../../apis";
import { throwSafeError } from "../../../shared";
import { IFormKeys, ISchemaLoginForm } from "./schema";

export default async function submitAction(formData: ISchemaLoginForm) {
  try {
    const result = await signIn({
      email: formData[IFormKeys.Email],
      password: formData[IFormKeys.Password],
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
