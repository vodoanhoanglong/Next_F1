import { yup } from "../../shared";

export enum IFormKeys {
  Email = "email",
  Password = "password",
}

export type FormValues = {
  [IFormKeys.Email]: string;
  [IFormKeys.Password]: string;
};

export enum ErrorValues {
  InvalidEmail = "Email không hợp lệ",
  RequiredEmail = "Email cần có",
  RequiredPassword = "Mật khẩu cần có",
}

export const SchemaLoginForm = yup.object().shape({
  [IFormKeys.Email]: yup.string().required(ErrorValues.RequiredEmail).email(ErrorValues.InvalidEmail),
  [IFormKeys.Password]: yup.string().required(ErrorValues.RequiredPassword),
});
