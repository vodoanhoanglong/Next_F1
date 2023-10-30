"use server";

import { revalidatePath } from "next/cache";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { IAboutFormKeys, ISchemaSubmitAboutForm } from ".";
import { IIntroduction, IMasterData } from "../..";
import { getDataAboutPage, updateAbout } from "../../../apis";
import { AdminRoute, AuthorizationCode, PathNameFirebase, reUploadFirebase, throwSafeError } from "../../../shared";

export async function getDataAboutAction() {
  try {
    const result = await getDataAboutPage();

    revalidatePath("/");

    return result;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}

export async function updateAboutAction(payload: ISchemaSubmitAboutForm, token: string) {
  try {
    const urls = await reUploadFirebase(`${PathNameFirebase.AboutImage}`, [
      payload[IAboutFormKeys.ImageLeft],
      payload[IAboutFormKeys.ImageCenter],
      payload[IAboutFormKeys.ImageRight],
    ]);

    const updateFields = {
      additionalValue: payload[IAboutFormKeys.DescriptionDetail],
      data: JSON.stringify({
        title: payload[IAboutFormKeys.Title],
        description: payload[IAboutFormKeys.Description],
        imageLeft: urls[0],
        imageCenter: urls[1],
        imageRight: urls[2],
      } as IIntroduction),
    } as unknown as IMasterData;

    const response = await updateAbout(updateFields, token);

    revalidatePath("/");

    return response;
  } catch (error) {
    const errorType = throwSafeError(error).message;
    if (errorType === AuthorizationCode.AccessDenied)
      redirect(`${AdminRoute.Login}?code=${AuthorizationCode.AccessDenied}`, RedirectType.replace);

    return Promise.reject(error);
  }
}
