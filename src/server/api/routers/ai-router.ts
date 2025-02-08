import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { streamObject, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { feedbackSchema } from "../../../schemas/feedback-schema";

export const aiRouter = createTRPCRouter({
  // Created as POC but directly consuming the streamed object was difficult and writing a parser for incomplete object was going to take too much time
  // That is why i used createStreamableValue and readStreamableValue in an action.
  generateFeedback: publicProcedure
    .input(
      z.object({
        code: z.string(),
      }),
    )
    .mutation(async function* ({ input }) {
      const res = await streamObject({
        model: openai("gpt-4o-2024-11-20"),
        system: `"Act as a senior FullStack engineer. Analyze this JavaScript code for FullStack issues.
      Provide feedback and recommendations, and if the code meets the quality requirements approve it.
     "`,
        prompt: `Code: ${input.code}`,
        schema: feedbackSchema,
        maxTokens: 300,
        schemaDescription: "Format for feedback to be given.",
      });

      for await (const textPart of res.textStream) {
        process.stdout.write(textPart);

        console.log({ at: "loop", textPart });
        await new Promise((resolve) => setTimeout(resolve, 500));
        yield textPart;
      }
    }),
});
