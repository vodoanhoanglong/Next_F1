import { z } from "zod";

export enum IAboutFormKeys {
  Title = "title",
  Description = "description",
  DescriptionDetail = "descriptionDetail",
  ImageLeft = "imageLeft",
  ImageCenter = "imageCenter",
  ImageRight = "imageRight",
}

enum ErrorValues {
  RequiredTitle = "Tiêu đề cần có",
  RequiredDescription = "Mô tả ngắn cần có",
  RequiredImageCenter = "Hình giữa cần có",
  RequiredImageLeft = "Hình trái cần có",
  RequiredImageRight = "Hình phải cần có",
  RequiredDescriptionDetail = "Mô tả chi tiết cần có",
}

export const SchemaSubmitAboutForm = z.object({
  [IAboutFormKeys.Title]: z.string().min(1, ErrorValues.RequiredTitle),
  [IAboutFormKeys.Description]: z.string().min(1, ErrorValues.RequiredDescription),
  [IAboutFormKeys.DescriptionDetail]: z.string().min(1, ErrorValues.RequiredDescriptionDetail),
  [IAboutFormKeys.ImageLeft]: z.string().min(1, ErrorValues.RequiredImageLeft),
  [IAboutFormKeys.ImageCenter]: z.string().min(1, ErrorValues.RequiredImageCenter),
  [IAboutFormKeys.ImageRight]: z.string().min(1, ErrorValues.RequiredImageRight),
});

export const SchemaOptionalAboutForm = z.object({
  [IAboutFormKeys.Title]: z.string().optional(),
  [IAboutFormKeys.Description]: z.string().optional(),
  [IAboutFormKeys.DescriptionDetail]: z.string().optional(),
  [IAboutFormKeys.ImageLeft]: z.string().optional(),
  [IAboutFormKeys.ImageCenter]: z.string().optional(),
  [IAboutFormKeys.ImageRight]: z.string().optional(),
});

export type ISchemaSubmitAboutForm = z.infer<typeof SchemaSubmitAboutForm>;
export type ISchemaOptionalAboutForm = z.infer<typeof SchemaOptionalAboutForm>;
