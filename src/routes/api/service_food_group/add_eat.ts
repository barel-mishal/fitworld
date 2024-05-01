import { server$, z } from "@builder.io/qwik-city";
import { serverInitDatabase } from "~/routes/seedDatabase";
import { IngredientSchema } from "./get_food_groups";
import { type ExtendSession } from "~/routes/plugin@auth";

export const EatSchema = z.object({
  id: z.string().optional(),
  food: z.string(),
  amount: z.string().pipe( z.coerce.number() ).or(z.number()),
  measurement: z.string(),
  createdAt: z.string().pipe( z.coerce.date() ).or(z.date()).optional(),
  updatedAt: z.string().pipe( z.coerce.date() ).or(z.date()).optional(),
  eatedAt: z.string().pipe( z.coerce.date() ).or(z.date()).optional(),
});

export type Eat = z.infer<typeof EatSchema>;

export const transformEat = IngredientSchema.transform((data) => {
  return {
    amount: typeof data.amount === "number" ? data.amount : parseFloat(data.amount) ,
    food: data.id,
    measurement: data.selectedMeasurement,
  };
});

export const serverAddEat = server$(async function(options: Eat) {
    try {
        const parsed = EatSchema.safeParse(options);
        if (!parsed.success) {
          console.error(parsed.error);
          return {
            error: parsed.error
          }
        }
        const session = this.sharedMap.get("session") as ExtendSession;
        const db = await serverInitDatabase();
        await db.authenticate(session.database.token);
        await db.use({ namespace: "namespace", database: "database" });

        const result = await db.create<Eat>(`Eat`, options);
        const parsedResult = EatSchema.array().safeParse(result);
        if (!parsedResult.success) {
          console.error(parsedResult.error);
          return {
            error: parsedResult.error
          }
        }
        return {
          eat: parsedResult.data
        }
    } catch (error) {
        console.error(error);
        return {
          eat: []
        }
      }
  });
