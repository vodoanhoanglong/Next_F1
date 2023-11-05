"use server";

import { revalidatePath } from "next/cache";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { getDataContactAdminPage } from "../../../apis";
import { AdminRoute, AuthorizationCode, throwSafeError } from "../../../shared";

export async function getDataContactAction(page: number) {
  try {
    const result = await getDataContactAdminPage({ page });

    revalidatePath("/");

    return result;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}
