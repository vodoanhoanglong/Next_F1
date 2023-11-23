"use server";

import { revalidatePath } from "next/cache";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { addProduct, getDataProductAdminPage, updateCategory, updateProduct } from "../../../apis";
import {
  AdminRoute,
  AuthorizationCode,
  IProductFilterProps,
  PathNameFirebase,
  StatusCode,
  reUploadFirebase,
  throwSafeError,
  uploadFirebase,
} from "../../../shared";
import { IProductFormKeys, ISchemaSubmitProductForm } from "./schema";

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
    const tempImages = payload[IProductFormKeys.Images];
    payload[IProductFormKeys.Images] = [];

    const response = await addProduct(payload, token);

    if (!response.id) return Promise.reject("Create Failed");

    const urls = await uploadFirebase(`${PathNameFirebase.Product}/${response.id}`, tempImages);

    payload[IProductFormKeys.Images] = urls;

    const updateRes = await updateCategory(payload, response.id, token);

    revalidatePath("/");

    return updateRes;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}

export async function updateProductAction(payload: ISchemaSubmitProductForm, productId: string, token: string) {
  try {
    const urls = await reUploadFirebase(`${PathNameFirebase.Product}/${productId}`, payload[IProductFormKeys.Images]);

    payload[IProductFormKeys.Images] = urls;

    const response = await updateProduct(payload, productId, token);
    revalidatePath("/");

    return response;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}

export async function deleteProductAction(
  payload: Partial<ISchemaSubmitProductForm & { status: StatusCode }>,
  productId: string,
  token: string,
) {
  try {
    const response = await updateProduct(payload, productId, token);
    revalidatePath("/");

    return response;
  } catch (error) {}
}
