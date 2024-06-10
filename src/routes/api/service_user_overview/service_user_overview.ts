

import { server$ } from '@builder.io/qwik-city';
import { z } from 'zod';
import { serverDatabaseUserSession } from '~/routes/seedDatabase';

// Schema for the TEE_RDA object
const TEERDASchema = z.object({
  heigh: z.number().nonnegative(), // assuming non-negative decimal
  low: z.number().nonnegative()    // assuming non-negative decimal
});

// Schema for the ideal_weight object
const IdealWeightSchema = z.object({
  message: z.string(),
  value: z.number().nonnegative() // assuming non-negative decimal
});

// Schema for the lastSteps array
const LastStepSchema = z.object({
  id: z.string(),
  section: z.number(),
  unit: z.number(),
  level: z.number(),
});

// Main schema for the objects in the array
const UserOverviewSchema = z.object({
  TEE: z.number().nonnegative(), // assuming non-negative decimal
  TEE_RDA: TEERDASchema,
  bmi: z.number().nonnegative(), // assuming non-negative decimal
  constant: z.number(),
  id: z.string(),
  ideal_weight: IdealWeightSchema,
  lastSteps: z.array(LastStepSchema),
  normaliz_weight: z.number().nonnegative(), // assuming non-negative decimal
  userId: z.string()
});

// Schema for the array of objects
const UserOverviewArraySchema = z.array(UserOverviewSchema);

type UserOverviewType = z.infer<typeof UserOverviewArraySchema>;

 const serverGetUserOverview = server$(async function() {
    const db = await serverDatabaseUserSession();
    if (!db.success) return {success: false, error: db.error, value: null}
    const userOverview = await db.value?.query<[UserOverviewType]>(`
    SELECT * FROM user_overview;
    `);
    await db.value?.close();
    return {
        success: true, 
        value: userOverview, 
        error: null
    };
  });
export default serverGetUserOverview;