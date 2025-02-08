import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { feedbackSchema } from "~/schemas/feedback-schema";

export const submissions = createTRPCRouter({
  getAll: publicProcedure.query(async function ({ ctx }) {
    return ctx.db.submission
      .findMany({
        include: {
          feedback: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      .then((solutions) => {
        return solutions.map((solution) => {
          return {
            ...solution,
            feedback: {
              ...solution.feedback,
              keyFindings: keyFindingsToClient(solution.feedback.keyFindings),
            },
          };
        });
      });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async function ({ ctx, input }) {
      return ctx.db.submission
        .findFirstOrThrow({
          where: {
            id: input.id,
          },
          include: {
            feedback: true,
          },
        })
        .then((solution) => {
          return {
            ...solution,
            feedback: {
              ...solution,
              keyFindings: keyFindingsToClient(solution.feedback.keyFindings),
            },
          };
        });
    }),

  generateFeedback: publicProcedure
    .input(
      z.object({
        code: z.string(),
        language: z.enum(["JavaScript", "TypeScript", "Python"]),
        feedback: feedbackSchema,
      }),
    )
    .mutation(async function ({ ctx, input }) {
      const { shortSummary, keyFindings, criticalRecommendations } =
        input.feedback;

      const feedback = await ctx.db.feedback.create({
        data: {
          shortSummary: shortSummary,
          keyFindings: keyFindingsToDB(keyFindings),
          criticalRecommendations,
        },
      });

      return await ctx.db.submission.create({
        data: {
          feedbackId: feedback.id,
          code: input.code,
          language: input.language,
        },
      });
    }),
});

// For storing array of strings in record, I know it's not right, but I am running short of time
const DELIMITER = "!@!";
function keyFindingsToDB(findingsArr: string[]) {
  return findingsArr.join(DELIMITER);
}

function keyFindingsToClient(findingsString: string) {
  return findingsString.split(DELIMITER);
}
