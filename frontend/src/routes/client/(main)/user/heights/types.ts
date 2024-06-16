import { z } from "@builder.io/qwik-city";
import { sDate } from "~/util/types";

export const schemaHeightRecord = z.object(  {
    createdAt: sDate,
    id: z.string(),
    type: z.union([z.literal("m"), z.literal("cm"), z.literal("FT")]),
    updateAt: sDate,
    userId: z.string(),
    value: z.number().int().positive(),
});