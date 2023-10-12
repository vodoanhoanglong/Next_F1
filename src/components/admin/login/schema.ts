import { z } from "zod";

export enum IFormKeys {
  Email = "email",
  Password = "password",
}

export enum ErrorValues {
  InvalidEmail = "Email không hợp lệ",
  RequiredEmail = "Email cần có",
  RequiredPassword = "Mật khẩu cần có",
}

export const SchemaLoginForm = z.object({
  [IFormKeys.Email]: z.string().email(ErrorValues.InvalidEmail).min(1, ErrorValues.RequiredEmail),
  [IFormKeys.Password]: z.string().min(1, ErrorValues.RequiredPassword),
});

export type ISchemaLoginForm = z.infer<typeof SchemaLoginForm>;
