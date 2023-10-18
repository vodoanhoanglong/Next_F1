"use server";

import { revalidatePath } from "next/cache";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { addCategory, getDataCategoryAdminPage, updateCategory } from "../../../apis";
import {
  AdminRoute,
  AuthorizationCode,
  ICategoryFilterProps,
  PathNameFirebase,
  StatusCode,
  throwSafeError,
  uploadFirebase,
} from "../../../shared";
import { IFormKeys, ISchemaSubmitCategoryForm } from "./schema";

export async function getDataCategoryAction(filter: ICategoryFilterProps) {
  try {
    const result = await getDataCategoryAdminPage(filter);

    revalidatePath("/");

    return result;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}

export async function submitCategoryAction(payload: ISchemaSubmitCategoryForm, token: string) {
  try {
    const response = await addCategory(payload, token);

    if (!response.id) return Promise.reject("Create Failed");

    const [image, icon] = await Promise.all([
      uploadFirebase(`${PathNameFirebase.CategoryBanner}/${response.id}`, [payload[IFormKeys.Image]]),
      uploadFirebase(`${PathNameFirebase.CategoryLogo}/${response.id}`, [payload[IFormKeys.Icon]]),
    ]);

    payload[IFormKeys.Image] = image[0];
    payload[IFormKeys.Icon] = icon[0];

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

export async function updateCategoryAction(payload: ISchemaSubmitCategoryForm, categoryId: string, token: string) {
  try {
    if (payload[IFormKeys.Image].startsWith("data:")) {
      const image = await uploadFirebase(`${PathNameFirebase.CategoryBanner}/${categoryId}`, [
        payload[IFormKeys.Image],
      ]);
      payload[IFormKeys.Image] = image[0];
    }

    if (payload[IFormKeys.Icon].startsWith("data:")) {
      const icon = await uploadFirebase(`${PathNameFirebase.CategoryLogo}/${categoryId}`, [payload[IFormKeys.Icon]]);

      payload[IFormKeys.Icon] = icon[0];
    }

    const response = await updateCategory(payload, categoryId, token);

    revalidatePath("/");

    return response;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}

export async function deleteCategoryAction(
  payload: Partial<ISchemaSubmitCategoryForm & { status: StatusCode }>,
  categoryId: string,
  token: string,
) {
  try {
    const response = await updateCategory(payload, categoryId, token);
    revalidatePath("/");

    return response;
  } catch (error) {}
}
