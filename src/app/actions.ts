"use server";
import { openai } from "@ai-sdk/openai";
import { streamObject, StreamObjectResult, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

import {
  PartialFeedback,
  feedbackSchema,
  Feedback,
} from "~/schemas/feedback-schema";
import { api } from "~/trpc/server";

const generateFeedbackSchema = z.object({
  code: z.string().min(4),
  language: z.enum(["JavaScript", "TypeScript", "Python"]),
});

type Params = z.infer<typeof generateFeedbackSchema>;

export async function generateFeedback(context: Params) {
  "use server";
  const feedbackStream = createStreamableValue<PartialFeedback>();

  try {
    generateFeedbackSchema.parse(context);
  } catch (e) {
    throw new Error("Action generateFeedback called with invalid parameters.");
  }

  const { code, language } = context;

  (async () => {
    const stream: StreamObjectResult<PartialFeedback, Feedback, never> =
      streamObject({
        model: openai("gpt-4o-2024-11-20"),
        system: `Act as if you are senior ${language}. Analyze this code for FullStack issues.
        Provide feedback and recommendations on how to improve the code.
     `,
        prompt: `Code: ${code}`,
        schema: feedbackSchema,
        maxTokens: 450,
        schemaDescription: "Format for feedback to be given.",
        onFinish: async (props) => {
          const feedback = await stream.object;

          await api.submissions.create({ code, language, feedback });
        },
      });

    for await (const partialObject of stream.partialObjectStream) {
      feedbackStream.update(partialObject);
    }
    feedbackStream.done();
  })();

  return { object: feedbackStream.value };
}
