"use server";

import { revalidatePath } from "next/cache";
import { createContact } from "../../apis";
import { FormValues, IFormKeys } from "./schema";

export default async function submitAction(formData: FormValues) {
  await createContact({
    email: formData[IFormKeys.Email],
    fullName: formData[IFormKeys.FullName],
    phoneNumber: formData[IFormKeys.PhoneNumber],
    metadata: {
      message: formData[IFormKeys.Message],
    },
  });

  revalidatePath("/");
}
