"use server";
import { openai } from "@ai-sdk/openai";
import { streamObject, StreamObjectResult } from "ai";
import { createStreamableValue } from "ai/rsc";

import {
  PartialFeedback,
  feedbackSchema,
  Feedback,
} from "~/schemas/feedback-schema";

export async function generateFeedback(context: string) {
  "use server";
  const feedbackStream = createStreamableValue<PartialFeedback>();

  (async () => {
    const stream: StreamObjectResult<PartialFeedback, Feedback, never> =
      streamObject({
        model: openai("gpt-4o-2024-11-20"),
        system: `"Act as a senior FullStack engineer. Analyze this JavaScript code for FullStack issues.
      Provide feedback and recommendations, and if the code meets the quality requirements approve it.
     "`,
        prompt: `Code: ${context}`,
        schema: feedbackSchema,
      });

    for await (const partialObject of stream.partialObjectStream) {
      feedbackStream.update(partialObject);
    }

    feedbackStream.done();
  })();

  return { object: feedbackStream.value };
}
