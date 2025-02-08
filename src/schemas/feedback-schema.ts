import { DeepPartial } from "ai";
import { z } from "zod";

export const feedbackSchema = z
  .object({
    shortSummary: z.string().describe("Brief summary (1 sentence)"),
    criticalRecommendations: z
      .string()
      .describe("Most critical recommendations"),
    keyFindings: z.array(
      z.string().describe("Key findings from the code review."),
    ),
  })
  .describe("Feedback, limited to 300 tokens");

export type PartialFeedback = DeepPartial<z.infer<typeof feedbackSchema>>;
export type Feedback = z.infer<typeof feedbackSchema>;
