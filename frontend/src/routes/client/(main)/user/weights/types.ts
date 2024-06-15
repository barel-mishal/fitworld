import { z } from "@builder.io/qwik-city";
import { sDate } from "~/util/types";

export const schemaWeightRecord = z.object(  {
    createdAt: sDate,
    id: z.string(),
    type: z.union([z.literal("kg"), z.literal("g"), z.literal("lb")]),
    updateAt: sDate,
    userId: z.string(),
    value: z.number().int().positive(),
});