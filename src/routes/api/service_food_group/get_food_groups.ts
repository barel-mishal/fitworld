import { server$ } from "@builder.io/qwik-city";
import { serverInitDatabase } from "~/routes/seedDatabase";

import { z } from 'zod';

const UnitSchema = z.object({
  hebrew_unit: z.string(),
  id: z.string(),
  in: z.string(),
  out: z.string(),
  unit: z.string(),
  weight: z.number(),
});

const IngredientSchema = z.object({
  addCarbs: z.number(),
  addFat: z.number(),
  addProtein: z.number(),
  amount: z.number(),
  foodGroupNumber: z.array(z.number()),
  group: z.string(),
  hebrew_name: z.string(),
  id: z.string(),
  name: z.string(),
  selectedMeasurement: z.string(),
  serving: z.number(),
  servingUnit: z.string(),
  units: z.array(UnitSchema),
  units_names: z.array(z.string()),
});

export type Ingredient = z.infer<typeof IngredientSchema>;

  interface ServerGetIngredientsOptions {
    limit?: number;
    search?: string;
    [key: string]: string | number | undefined;
  }
  export const serverGetIngredients = server$(async function(options: ServerGetIngredientsOptions) {
      try {
        const db = await serverInitDatabase();
        await db.use({ namespace: "namespace", database: "database" });
        const result = await db.query_raw<[Partial<Ingredient>[]]>(`
        IF $search != "" THEN 
          SELECT *, ->ingredient_measurements.* AS units, ->ingredient_measurements.*.out.name AS units_names FROM Ingredient WHERE name ~ $search LIMIT $limit
        ELSE
          SELECT *, ->ingredient_measurements.* AS units, ->ingredient_measurements.*.out.name AS units_names FROM Ingredient LIMIT $limit
        END;
        `, options);
        if (result[0].status === "ERR") return {ingredients: []}
        const ingredients = IngredientSchema.array().safeParse(result[0].result);
        if (!ingredients.success) {
          console.error(ingredients.error);
          return {
            ingredients: []
          }
        }
        return {
          ingredients: ingredients.data
        } 
      } catch (error) {
        console.error(error);
        return {
          ingredients: []
        }
      }
  });