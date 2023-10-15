"use server";

import { revalidatePath } from "next/cache";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { addProduct, getDataProductAdminPage } from "../../../apis";
import {
  AdminRoute,
  AuthorizationCode,
  IProductFilterProps,
  PathNameFirebase,
  throwSafeError,
  uploadFirebase,
} from "../../../shared";
import { IFormKeys, ISchemaSubmitProductForm } from "./schema";

export async function getDataProductAction(filter: IProductFilterProps) {
  try {
    const result = await getDataProductAdminPage(filter);

    revalidatePath("/");

    return result;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}

export async function submitProductAction(payload: ISchemaSubmitProductForm, token: string) {
  try {
    const urls = await uploadFirebase(
      `${PathNameFirebase.Product}/${payload[IFormKeys.Code]}`,
      payload[IFormKeys.Images],
    );

    payload[IFormKeys.Images] = urls;

    const response = await addProduct(payload, token);
    revalidatePath("/");

    return response.id;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}
