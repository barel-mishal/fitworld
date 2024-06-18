import { z } from "@builder.io/qwik-city";
import { sDate } from "~/util/types";

export const schemaStringNumber = z.string().pipe(z.coerce.number().int().positive());

export const schemaHeightRecord = z.object(  {
    createdAt: sDate,
    id: z.string(),
    type: z.union([z.literal("m"), z.literal("cm"), z.literal("FT")]),
    updateAt: sDate,
    userId: z.string(),
    value: schemaStringNumber,
});