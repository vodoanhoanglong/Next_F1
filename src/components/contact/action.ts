"use server";

import { revalidatePath } from "next/cache";
import { createContact } from "../../apis";
import { IContactFormKeys, ISchemaContactForm } from "./schema";

export default async function submitAction(formData: ISchemaContactForm) {
  await createContact({
    email: formData[IContactFormKeys.Email],
    fullName: formData[IContactFormKeys.FullName],
    phoneNumber: formData[IContactFormKeys.PhoneNumber],
    metadata: {
      message: formData[IContactFormKeys.Message],
    },
  });

  revalidatePath("/");
}
