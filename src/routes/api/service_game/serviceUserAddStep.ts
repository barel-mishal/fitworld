import { server$ } from "@builder.io/qwik-city";
import { type ExtendSession } from "~/routes/plugin@auth";
import { serverInitDatabase } from "~/routes/seedDatabase";
import { z } from 'zod';

// Define the schema for StepTextType
const StepTextSchema = z.object({
  type: z.literal('text'),
  title: z.string(),
  text: z.string(),
});

// Define the schema for StepMultipleChoiceType
const StepMultipleChoiceSchema = z.object({
  type: z.literal('multiple-choice'),
  question: z.string(),
  title: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  answer: z.union([z.number(), z.undefined()]),
});

// Define the schema for StepFinishType
const StepFinishSchema = z.object({
  type: z.literal('finish'),
});

// Union schema for AnyStepType
const AnyStepTypeSchema = z.union([
  StepTextSchema,
  StepMultipleChoiceSchema,
  StepFinishSchema,
]);

// Example of using AnyStepType schema
const ExampleAnyStep = z.array(AnyStepTypeSchema);

export type StepTextType = z.infer<typeof StepTextSchema>;
export type StepMultipleChoiceType = z.infer<typeof StepMultipleChoiceSchema>;
export type StepFinishType = z.infer<typeof StepFinishSchema>;
export type AnyStepType = z.infer<typeof ExampleAnyStep>;

export const serverUserAddStep = server$(async function(data: {unit: number, section: number, index: number}) {
    const session: ExtendSession | null = this.sharedMap.get('session');
    const token = session?.database.token
    if (!token) throw new Error('No token');
    // nutrition unit, section, index
    const prepare: AnyStepType = [
        {
            type: 'text',
            title: 'Introduction',
            text: 'This is the introduction of the game',
        },
        {
            type: 'text',
            title: 'Content',
            text: 'This is the content of the game',
        },
        {
            type: 'multiple-choice',
            title: 'Question 1',
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correctAnswer: 0,
            answer: undefined,
        },
        {
            type: 'multiple-choice',
            title: 'Question 2',
            question: 'What is the capital of Germany?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correctAnswer: 2,
            answer: undefined,
        },
        {
            type: 'multiple-choice',
            title: 'Question 3',
            question: 'What is the capital of Spain?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correctAnswer: 3,
            answer: undefined,
        },
        {
            type: 'finish'
        }
    ];
    const db = await serverInitDatabase();
    await db.authenticate(token);

    console.log(data);
    console.log(prepare);

    return {
      
    }
  }
);



export { StepTextSchema, StepMultipleChoiceSchema, StepFinishSchema };

