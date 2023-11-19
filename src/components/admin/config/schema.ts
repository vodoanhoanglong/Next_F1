import { z } from "zod";

export enum IConfigFormKeys {
  Banner = "banner",
  Partner = "partner",
}

enum ErrorValues {
  RequiredBanner = "Cuộn hình ảnh cần ít nhất 3 hình",
  RequiredPartner = "Hình ảnh đối tác cần ít nhất 3 hình",
}

export const SchemaSubmitConfigForm = z.object({
  [IConfigFormKeys.Banner]: z.array(z.string()).min(3, ErrorValues.RequiredBanner),
  [IConfigFormKeys.Partner]: z.array(z.string()).min(3, ErrorValues.RequiredPartner),
});

export const SchemaOptionalConfigForm = z.object({
  [IConfigFormKeys.Banner]: z.string().optional(),
  [IConfigFormKeys.Partner]: z.string().optional(),
});

export type ISchemaSubmitConfigForm = z.infer<typeof SchemaSubmitConfigForm>;
export type ISchemaOptionalConfigForm = z.infer<typeof SchemaOptionalConfigForm>;
