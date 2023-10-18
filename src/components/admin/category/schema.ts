import { z } from "zod";

export enum IFormKeys {
  Code = "code",
  Name = "name",
  Description = "description",
  Image = "image",
  Icon = "icon",
}

export enum ErrorValues {
  RequiredCode = "Mã danh mục cần có",
  RequiredName = "Tên danh mục cần có",
  RequiredDescription = "Mô tả cho danh mục cần có",
  RequiredIcon = "Logo danh mục cần có",
  RequiredImage = "Hình ảnh tượng trưng cần có",
  NoSpaceCode = "Mã danh mục không được có khoảng cách",
}

export const SchemaSubmitCategoryForm = z.object({
  [IFormKeys.Code]: z
    .string()
    .min(1, ErrorValues.RequiredCode)
    .refine((s) => !s.includes(" "), ErrorValues.NoSpaceCode),
  [IFormKeys.Name]: z.string().min(1, ErrorValues.RequiredName),
  [IFormKeys.Description]: z.string().min(1, ErrorValues.RequiredDescription),
  [IFormKeys.Icon]: z.string().min(1, ErrorValues.RequiredIcon),
  [IFormKeys.Image]: z.string().min(1, ErrorValues.RequiredImage),
});

export const SchemaOptionalCategoryForm = z.object({
  [IFormKeys.Code]: z.string().optional(),
  [IFormKeys.Name]: z.string().optional(),
  [IFormKeys.Icon]: z.string().optional(),
  [IFormKeys.Image]: z.string().optional(),
  [IFormKeys.Description]: z.string().optional(),
});

export type ISchemaSubmitCategoryForm = z.infer<typeof SchemaSubmitCategoryForm>;
export type ISchemaOptionalCategoryForm = z.infer<typeof SchemaOptionalCategoryForm>;
