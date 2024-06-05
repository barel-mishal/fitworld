import { z } from 'zod';

export const StepTextSchema = z.object({
    type: z.literal('step_text'),
    title: z.string(),
    text: z.string(),
});
export const StepMultipleChoiceSchema = z.object({
    type: z.literal('step_multiple_choice'),
    title: z.string(),
    question: z.string(),
    options: z.array(z.string()),
    correctAnswer: z.number(),
    answer: z.number().optional(),
});
export const StepFinishSchema = z.object({
    type: z.literal('step_finish'),
});


const MetadataSchema = z.union([
    z.object({
        type: z.literal('step_text'),
        title: z.string(),
        text: z.string(),
    }),
    z.object({
        type: z.literal('step_multiple_choice'),
        title: z.string(),
        question: z.string(),
        options: z.array(z.string()),
        correctAnswer: z.number(),
        answer: z.number().optional(),
    }),
    z.object({
        type: z.literal('step_finish'),
    }),
]);

// Define the steps schema
const StepSchema = z.object({
  userId: z.string(), // assuming default-user-id is replaced by actual auth id in the application
  unit: z.number().int(),
  index: z.number().int(),
  section: z.number().int(),
  metadata: MetadataSchema,
});

export { StepSchema };



// Example of using AnyStepType schema
export type StepTextType = z.infer<typeof StepTextSchema>;
export type StepMultipleChoiceType = z.infer<typeof StepMultipleChoiceSchema>;
export type StepFinishType = z.infer<typeof StepFinishSchema>;
export type StepMetadata = z.infer<typeof MetadataSchema>;
export type Step = z.infer<typeof StepSchema>;