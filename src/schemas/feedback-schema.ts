import { DeepPartial } from "ai";
import { z } from "zod";

export const feedbackSchema = z.object({
  criticalRecommendations: z
    .array(z.string().describe("Explanation / Instruction / Suggestion"))
    .describe("Most critical recommendations")
    .optional(),

  keyFindings: z.array(
    z.string().describe("Key findings from the code review."),
  ),
  shortSummary: z.string().describe("Brief summary (1 sentence)"),
  approved: z
    .object({
      status: z
        .boolean()
        .describe("Approved or Not Approved, based on the occurred analysis"),
    })
    .describe(
      "Does the code meet the quality criteria to be merged in a production codebase.",
    ),
});

export type PartialFeedback = DeepPartial<z.infer<typeof feedbackSchema>>;
export type Feedback = z.infer<typeof feedbackSchema>;
