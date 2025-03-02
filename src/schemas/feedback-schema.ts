import type { DeepPartial } from "ai";
import { z } from "zod";

export const feedbackSchema = z
  .object({
    shortSummary: z.string().describe("Brief summary (1 sentence)"),
    criticalRecommendations: z
      .string()
      .optional()
      .describe("Most critical recommendations"),
    keyFindings: z.array(
      z.string().describe("Key findings from the code review."),
    ),
  })
  .describe("Code Review Feedback, limited to 450 tokens");

export type PartialFeedback = DeepPartial<z.infer<typeof feedbackSchema>>;
export type Feedback = z.infer<typeof feedbackSchema>;
