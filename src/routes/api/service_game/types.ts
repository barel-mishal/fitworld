import { z } from "zod";

export const StepTextSchema = z.object({
  type: z.literal("step_text"),
  title: z.string(),
  text: z.string(),
});
export const StepMultipleChoiceSchema = z.object({
  type: z.literal("step_multiple_choice"),
  title: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  answer: z.number().optional(),
});
export const StepFinishSchema = z.object({
  type: z.literal("step_finish"),
});

const MetadataSchema = z.union([
  z.object({
    type: z.literal("step_text"),
    title: z.string(),
    text: z.string(),
  }),
  z.object({
    type: z.literal("step_multiple_choice"),
    title: z.string(),
    question: z.string(),
    options: z.array(z.string()),
    correctAnswer: z.number(),
    answer: z.optional(z.number()),
  })
]);

// Define the steps schema
const StepSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(), // assuming default-user-id is replaced by actual auth id in the application
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

// Function to validate and process the JSON string
export function validateAndProcessJson(jsonString: string) {
  try {
    // Parse the JSON string
    const parsedJson = JSON.parse(jsonString);

    // Validate the parsed JSON
    const result = z
      .object({ steps: StepSchema.partial().array() })
      .parse(parsedJson);

    // Perform some action if valid
    return result;
    // You can add more actions here as needed
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", error.errors);
    } else {
      console.error("Failed to parse JSON:", error);
    }
  }
}
