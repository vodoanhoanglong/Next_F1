"use server";

import { revalidatePath } from "next/cache";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { IBlogFormKeys, ISchemaSubmitBlogForm } from ".";
import { addBlog, getDataBlogAdminPage, updateBlog } from "../../../apis";
import {
  AdminRoute,
  AuthorizationCode,
  PathNameFirebase,
  reUploadFirebase,
  throwSafeError,
  uploadFirebase,
} from "../../../shared";

export async function getDataBlogAction(page: number) {
  try {
    const result = await getDataBlogAdminPage({ page });

    revalidatePath("/");

    return result;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}

export async function submitBlogAction(payload: ISchemaSubmitBlogForm, token: string) {
  try {
    const response = await addBlog(payload, token);

    if (!response.id) return Promise.reject("Create Failed");

    const image = await uploadFirebase(`${PathNameFirebase.BlogImage}/${response.id}`, [payload[IBlogFormKeys.Banner]]);

    payload[IBlogFormKeys.Banner] = image[0];

    const updateRes = await updateBlog(payload, response.id, token);

    revalidatePath("/");

    return updateRes;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}

export async function updateBlogAction(payload: ISchemaSubmitBlogForm, id: string, token: string) {
  try {
    const urls = await reUploadFirebase(`${PathNameFirebase.BlogImage}`, [payload[IBlogFormKeys.Banner]]);

    payload[IBlogFormKeys.Banner] = urls[0];

    const response = await updateBlog(payload, id, token);

    revalidatePath("/");

    return response;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}
