import { z } from "zod";

export enum IContactFormKeys {
  FullName = "fullName",
  Email = "email",
  PhoneNumber = "phoneNumber",
  Message = "message",
}

export type IContactFormValues = {
  [IContactFormKeys.Email]: string;
  [IContactFormKeys.Message]: string;
  [IContactFormKeys.FullName]: string;
  [IContactFormKeys.PhoneNumber]: string;
};

enum ErrorValues {
  InvalidEmail = "Email không hợp lệ",
  RequiredFullName = "Họ và tên cần có",
  RequiredPhoneNumber = "SĐT cần có",
  RequiredMessage = "Thông điệp cần có",
  RequiredEmail = "Email cần có",
  InvalidPhoneNumber = "SĐT không hợp lệ",
}

export const SchemaContactForm = z.object({
  [IContactFormKeys.Email]: z.string().min(1, ErrorValues.RequiredEmail).email(ErrorValues.InvalidEmail),
  [IContactFormKeys.FullName]: z.string().min(1, ErrorValues.RequiredFullName),
  [IContactFormKeys.PhoneNumber]: z.string().min(1, ErrorValues.RequiredPhoneNumber),
  [IContactFormKeys.Message]: z.string().min(1, ErrorValues.RequiredMessage),
});

export type ISchemaContactForm = z.infer<typeof SchemaContactForm>;
