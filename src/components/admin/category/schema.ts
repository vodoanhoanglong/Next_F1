import { z } from "zod";

export enum ICategoryFormKeys {
  Code = "code",
  Name = "name",
  Description = "description",
  Image = "image",
  Icon = "icon",
}

enum ErrorValues {
  RequiredCode = "Mã danh mục cần có",
  RequiredName = "Tên danh mục cần có",
  RequiredDescription = "Mô tả cho danh mục cần có",
  RequiredIcon = "Logo danh mục cần có",
  RequiredImage = "Hình ảnh tượng trưng cần có",
  NoSpaceCode = "Mã danh mục không được có khoảng cách",
}

export const SchemaSubmitCategoryForm = z.object({
  [ICategoryFormKeys.Code]: z
    .string()
    .min(1, ErrorValues.RequiredCode)
    .refine((s) => !s.includes(" "), ErrorValues.NoSpaceCode),
  [ICategoryFormKeys.Name]: z.string().min(1, ErrorValues.RequiredName),
  [ICategoryFormKeys.Description]: z.string().min(1, ErrorValues.RequiredDescription),
  [ICategoryFormKeys.Icon]: z.string().min(1, ErrorValues.RequiredIcon),
  [ICategoryFormKeys.Image]: z.string().min(1, ErrorValues.RequiredImage),
});

export const SchemaOptionalCategoryForm = z.object({
  [ICategoryFormKeys.Code]: z.string().optional(),
  [ICategoryFormKeys.Name]: z.string().optional(),
  [ICategoryFormKeys.Icon]: z.string().optional(),
  [ICategoryFormKeys.Image]: z.string().optional(),
  [ICategoryFormKeys.Description]: z.string().optional(),
});

export type ISchemaSubmitCategoryForm = z.infer<typeof SchemaSubmitCategoryForm>;
export type ISchemaOptionalCategoryForm = z.infer<typeof SchemaOptionalCategoryForm>;
