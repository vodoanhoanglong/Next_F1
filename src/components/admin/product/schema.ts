import { z } from "zod";

export enum IFormKeys {
  Code = "code",
  Name = "name",
  Description = "description",
  CategoryId = "categoryId",
  Price = "price",
  Images = "images",
  HtmlContent = "htmlContent",
  BranchId = "branchId",
}

export enum ErrorValues {
  RequiredCategory = "Danh mục cần có",
  RequiredCode = "Mã sản phẩm cần có",
  RequiredName = "Tên sản phẩm cần có",
  RequiredDescription = "Mô tả ngắn sản phẩm cần có",
  RequiredPrice = "Giá sản phẩm cần có",
  RequiredImage = "Cần ít nhất 1 hình ảnh",
  RequiredDetailContent = "Mô tả chi tiết cần có",
  RequiredBrand = "Thương hiệu cần có",
}

export const SchemaSubmitProductForm = z.object({
  [IFormKeys.Code]: z.string().min(1, ErrorValues.RequiredCode),
  [IFormKeys.Name]: z.string().min(1, ErrorValues.RequiredName),
  [IFormKeys.Description]: z.string().min(1, ErrorValues.RequiredDescription),
  [IFormKeys.CategoryId]: z.string().min(1, ErrorValues.RequiredCategory),
  [IFormKeys.Price]: z.number().min(1, ErrorValues.RequiredPrice),
  [IFormKeys.Images]: z.array(z.string()).min(1, ErrorValues.RequiredImage),
  [IFormKeys.HtmlContent]: z.string().min(1, ErrorValues.RequiredDetailContent),
  [IFormKeys.BranchId]: z.string().min(1, ErrorValues.RequiredBrand),
});

export const SchemaOptionalProductForm = z.object({
  [IFormKeys.Code]: z.string().optional(),
  [IFormKeys.Name]: z.string().optional(),
  [IFormKeys.Description]: z.string().optional(),
  [IFormKeys.CategoryId]: z.string().optional(),
  [IFormKeys.Price]: z.string().optional(),
  [IFormKeys.Images]: z.string().optional(),
  [IFormKeys.HtmlContent]: z.string().optional(),
  [IFormKeys.BranchId]: z.string().optional(),
});

export type ISchemaSubmitProductForm = z.infer<typeof SchemaSubmitProductForm>;
export type ISchemaOptionalProductForm = z.infer<typeof SchemaOptionalProductForm>;
