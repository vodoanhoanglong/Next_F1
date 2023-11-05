"use server";

import { revalidatePath } from "next/cache";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { getDataConfigAdminPage } from "../../../apis";
import { AdminRoute, AuthorizationCode, throwSafeError } from "../../../shared";

export async function getDataConfigAction() {
  try {
    const result = await getDataConfigAdminPage();

    revalidatePath("/");

    return result;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}
