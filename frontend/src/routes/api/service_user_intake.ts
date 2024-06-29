import { server$ } from "@builder.io/qwik-city";
import { serverDatabaseUserSession } from "../seedDatabase";
import { z } from 'zod';

export const numberSchema = z.union([z.number(), z.string()]).pipe(z.coerce.number());

// Schema for MetaData
const MetaDataSchema = z.object({
  addCarbs: numberSchema,
  addFat: numberSchema,
  addProtein: numberSchema,
  amount: numberSchema,
  calories: numberSchema,
  measurement_unit: z.string(),
  measurement_weight: numberSchema,
  name: z.string(),
  serving: numberSchema,
  servingUnit: z.string(),
});

// Schema for CalculatedIntake
const CalculatedIntakeSchema = z.object({
  intake_calories: numberSchema,
  intake_carbs: numberSchema,
  intake_fats: numberSchema,
  intake_protein: numberSchema,
  meta: MetaDataSchema,
});

// Schema for Eated
const EatedSchema = z.object({
  addCarbs: numberSchema,
  addFat: numberSchema,
  addProtein: numberSchema,
  amount: numberSchema,
  calories: numberSchema,
  carbs: numberSchema,
  fats: numberSchema,
  measurement_unit: z.string(),
  measurement_weight: numberSchema,
  name: z.string(),
  protein: numberSchema,
  serving: numberSchema,
  servingUnit: z.string(),
});

// Schema for Totals
const TotalsSchema = z.object({
  total_calories: numberSchema,
  total_carbs: numberSchema,
  total_fats: numberSchema,
  total_proteins: numberSchema,
});

// Schema for IntakeData
const IntakeDataSchema = z.object({
  calculated_intake: z.array(CalculatedIntakeSchema),
  eated: z.array(EatedSchema),
  totals: z.array(TotalsSchema),
  times: z.array(z.union([z.string().pipe(z.coerce.date()), z.date()])),
});

// Type for MetaData
type TypeIntakeDataSchema = z.infer<typeof IntakeDataSchema>;

export const server_user_intake = server$(async function () {

    const dbUser = await serverDatabaseUserSession();
    if (!dbUser.success) {
        return { error: "User not found", success: false, value: null }
    }
    try {
        const intake = await dbUser.value?.query<[Partial<TypeIntakeDataSchema>]>(`RETURN fn::user_intake();`);
        const intakeData = IntakeDataSchema.safeParse(intake?.[0]);
        if (!intakeData.success) {
            return { error: "Data not valid", success: false, value: null }
        }
        return { success: true, value: intakeData.data, error: null};
    } catch (error) {
        console.error(error);
        return { error: "No data found", success: false, value: null }
    }


});