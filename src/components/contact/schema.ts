import { z } from "zod";

export enum IFormKeys {
  FullName = "fullName",
  Email = "email",
  PhoneNumber = "phoneNumber",
  Message = "message",
}

export type FormValues = {
  [IFormKeys.Email]: string;
  [IFormKeys.Message]: string;
  [IFormKeys.FullName]: string;
  [IFormKeys.PhoneNumber]: string;
};

export enum ErrorValues {
  InvalidEmail = "Email không hợp lệ",
  RequiredFullName = "Họ và tên cần có",
  RequiredPhoneNumber = "SĐT cần có",
  RequiredMessage = "Thông điệp cần có",
  RequiredEmail = "Email cần có",
  InvalidPhoneNumber = "SĐT không hợp lệ",
}

export const SchemaContactForm = z.object({
  [IFormKeys.Email]: z.string().min(1, ErrorValues.RequiredEmail).email(ErrorValues.InvalidEmail),
  [IFormKeys.FullName]: z.string().min(1, ErrorValues.RequiredFullName),
  [IFormKeys.PhoneNumber]: z.string().min(1, ErrorValues.RequiredPhoneNumber),
  [IFormKeys.Message]: z.string().min(1, ErrorValues.RequiredMessage),
});

export type ISchemaContactForm = z.infer<typeof SchemaContactForm>;
