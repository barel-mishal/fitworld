import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import { serverInitDatabase } from "~/routes/seedDatabase";
import { z } from 'zod';

// Define the schema for text steps
const StepTextSchema = z.object({
  type: z.string().refine((val) => val === 'text', {
    message: "Type must be 'text'",
  }),
  text: z.string(),
  next: z.string(),
  userId: z.string().default(() => 'auth.id'), // Assuming $auth.id is provided as a default value
});

// Define the schema for multiple-choice steps
const StepMultipleChoiceSchema = z.object({
  type: z.string().refine((val) => val === 'multiple-choice', {
    message: "Type must be 'multiple-choice'",
  }),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  answer: z.union([z.number(), z.null()]),
  next: z.string(),
  userId: z.string().default(() => 'auth.id'), // Assuming $auth.id is provided as a default value
});

// Define the schema for finish steps
const StepFinishSchema = z.object({
  type: z.string().refine((val) => val === 'finish', {
    message: "Type must be 'finish'",
  }),
  userId: z.string().default(() => 'auth.id'), // Assuming $auth.id is provided as a default value
});


export const serverUserAddStep = server$(async function(data: {step: number, userId: string}) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    const db = await serverInitDatabase();
    await db.authenticate(token);

    console.log(data);

    return {
      
    }
  }
);



export { StepTextSchema, StepMultipleChoiceSchema, StepFinishSchema };

