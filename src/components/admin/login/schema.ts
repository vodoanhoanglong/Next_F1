import { z } from "zod";

export enum ILoginFormKeys {
  Email = "email",
  Password = "password",
}

enum ErrorValues {
  InvalidEmail = "Email không hợp lệ",
  RequiredEmail = "Email cần có",
  RequiredPassword = "Mật khẩu cần có",
}

export const SchemaLoginForm = z.object({
  [ILoginFormKeys.Email]: z.string().email(ErrorValues.InvalidEmail).min(1, ErrorValues.RequiredEmail),
  [ILoginFormKeys.Password]: z.string().min(1, ErrorValues.RequiredPassword),
});

export type ISchemaLoginForm = z.infer<typeof SchemaLoginForm>;
