import { server$, z } from "@builder.io/qwik-city";
import { serverInitDatabase } from "~/routes/seedDatabase";

export const EatSchema = z.object({
  userId: z.string(),
  id: z.string().optional(),
  food: z.string(),
  amount: z.string().pipe( z.coerce.number() ).or(z.number()),
  measurement: z.string(),
  createdAt: z.string().pipe( z.coerce.date() ).or(z.date()).optional(),
  updatedAt: z.string().pipe( z.coerce.date() ).or(z.date()).optional(),
  eatedAt: z.string().pipe( z.coerce.date() ).or(z.date()).optional(),
});

export type Eat = z.infer<typeof EatSchema>;

export const serverAddEat = server$(async function(options: Eat) {
    try {
        const parsed = EatSchema.safeParse(options);
        console.log(parsed);
        // const db = await serverInitDatabase();
        // await db.use({ namespace: "namespace", database: "database" });
        // const result = await db.create<Eat>(`Eat`, options);
        // console.log(result);


      
        return {eat: []}
    } catch (error) {
        console.error(error);
        return {
          eat: []
        }
      }
  });
