import { yup } from "../../shared";

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

export const SchemaContactForm = yup.object().shape({
  [IFormKeys.Email]: yup.string().required(ErrorValues.RequiredEmail).email(ErrorValues.InvalidEmail),
  [IFormKeys.FullName]: yup.string().required(ErrorValues.RequiredFullName),
  [IFormKeys.PhoneNumber]: (yup.string().required(ErrorValues.RequiredPhoneNumber) as any).phoneNumber(
    ErrorValues.InvalidPhoneNumber,
  ),
  [IFormKeys.Message]: yup.string().required(ErrorValues.RequiredMessage),
});
