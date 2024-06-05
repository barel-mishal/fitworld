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
