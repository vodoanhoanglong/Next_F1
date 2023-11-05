import { z } from "zod";

export enum IBlogFormKeys {
  Type = "typeId",
  Title = "title",
  Description = "description",
  Content = "content",
  Banner = "banner",
}

enum ErrorValues {
  RequiredTypeId = "Thể loại cần có",
  RequiredTitle = "Tiêu đề cần có",
  RequiredDescription = "Mô tả ngắn cần có",
  RequiredBanner = "Hình ảnh tượng trưng cần có",
  RequiredContent = "Mô tả chi tiết cần có",
}

export const SchemaSubmitBlogForm = z.object({
  [IBlogFormKeys.Title]: z.string().min(1, ErrorValues.RequiredTitle),
  [IBlogFormKeys.Description]: z.string().min(1, ErrorValues.RequiredDescription),
  [IBlogFormKeys.Content]: z.string().min(1, ErrorValues.RequiredContent),
  [IBlogFormKeys.Type]: z.string().min(1, ErrorValues.RequiredTypeId),
  [IBlogFormKeys.Banner]: z.string().min(1, ErrorValues.RequiredBanner),
});

export const SchemaOptionalBlogForm = z.object({
  [IBlogFormKeys.Title]: z.string().optional(),
  [IBlogFormKeys.Description]: z.string().optional(),
  [IBlogFormKeys.Content]: z.string().optional(),
  [IBlogFormKeys.Type]: z.string().optional(),
  [IBlogFormKeys.Banner]: z.string().optional(),
});

export type ISchemaSubmitBlogForm = z.infer<typeof SchemaSubmitBlogForm>;
export type ISchemaOptionalBlogForm = z.infer<typeof SchemaOptionalBlogForm>;
