"use server";

import { revalidatePath } from "next/cache";
import { getDataCategoryNavbar } from "../../apis";

export async function getDataCategoryAction() {
  try {
    const result = await getDataCategoryNavbar();

    revalidatePath("/");

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}
