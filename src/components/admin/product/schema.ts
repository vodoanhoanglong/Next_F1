import { z } from "zod";

export enum IProductFormKeys {
  Code = "code",
  Name = "name",
  Description = "description",
  CategoryId = "categoryId",
  Price = "price",
  Images = "images",
  HtmlContent = "htmlContent",
  BrandId = "brandId",
}

enum ErrorValues {
  RequiredCategory = "Danh mục cần có",
  RequiredCode = "Mã CAS cần có",
  RequiredName = "Tên sản phẩm cần có",
  RequiredDescription = "Mô tả ngắn sản phẩm cần có",
  RequiredPrice = "Giá sản phẩm cần có",
  RequiredImage = "Cần ít nhất 1 hình ảnh",
  RequiredDetailContent = "Mô tả chi tiết cần có",
  RequiredBrand = "Thương hiệu cần có",
  NoSpaceCode = "Mã CAS không được có khoảng cách",
}

export const SchemaSubmitProductForm = z.object({
  [IProductFormKeys.Code]: z
    .string()
    .min(1, ErrorValues.RequiredCode)
    .refine((s) => !s.includes(" "), ErrorValues.NoSpaceCode),
  [IProductFormKeys.Name]: z.string().min(1, ErrorValues.RequiredName),
  [IProductFormKeys.Description]: z.string().min(1, ErrorValues.RequiredDescription),
  [IProductFormKeys.CategoryId]: z.string().min(1, ErrorValues.RequiredCategory),
  [IProductFormKeys.Price]: z.number().min(1, ErrorValues.RequiredPrice),
  [IProductFormKeys.Images]: z.array(z.string()).min(1, ErrorValues.RequiredImage),
  [IProductFormKeys.HtmlContent]: z.string().min(1, ErrorValues.RequiredDetailContent),
  [IProductFormKeys.BrandId]: z.string().min(1, ErrorValues.RequiredBrand),
});

export const SchemaOptionalProductForm = z.object({
  [IProductFormKeys.Code]: z.string().optional(),
  [IProductFormKeys.Name]: z.string().optional(),
  [IProductFormKeys.Description]: z.string().optional(),
  [IProductFormKeys.CategoryId]: z.string().optional(),
  [IProductFormKeys.Price]: z.string().optional(),
  [IProductFormKeys.Images]: z.string().optional(),
  [IProductFormKeys.HtmlContent]: z.string().optional(),
  [IProductFormKeys.BrandId]: z.string().optional(),
});

export type ISchemaSubmitProductForm = z.infer<typeof SchemaSubmitProductForm>;
export type ISchemaOptionalProductForm = z.infer<typeof SchemaOptionalProductForm>;
