"use server";

import { revalidatePath } from "next/cache";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { IConfigFormKeys, ISchemaSubmitConfigForm } from ".";
import { getDataConfigAdminPage, updateConfig } from "../../../apis";
import { AdminRoute, AuthorizationCode, PathNameFirebase, reUploadFirebase, throwSafeError } from "../../../shared";

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

export async function updateConfigAction(payload: ISchemaSubmitConfigForm, token: string) {
  try {
    const [bannerUrls, partnerUrls] = await Promise.all([
      reUploadFirebase(`${PathNameFirebase.Slider}`, payload[IConfigFormKeys.Banner]),
      reUploadFirebase(PathNameFirebase.Partner, payload[IConfigFormKeys.Partner]),
    ]);

    payload[IConfigFormKeys.Banner] = bannerUrls;
    payload[IConfigFormKeys.Partner] = partnerUrls;

    const response = await updateConfig(payload, token);

    revalidatePath("/");

    return response;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}
