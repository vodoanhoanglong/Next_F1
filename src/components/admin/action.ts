"use server";

import { revalidatePath } from "next/cache";
import { signIn } from "../../apis";
import { throwSafeError } from "../../shared";
import { FormValues, IFormKeys } from "./schema";

export default async function submitAction(formData: FormValues) {
  try {
    const result = await signIn({
      email: formData[IFormKeys.Email],
      password: formData[IFormKeys.Password],
    });

    revalidatePath("/");

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
      token: null,
      refreshToken: null,
    };
  }
}
