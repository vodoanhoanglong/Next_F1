"use server";

import { revalidatePath } from "next/cache";
import { getDataProductAdminPage } from "../../../apis";
import { IProductFilterProps } from "../../../shared";

export default async function getDataProductAction(filter: IProductFilterProps) {
  try {
    const result = await getDataProductAdminPage(filter);

    revalidatePath("/");

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}
