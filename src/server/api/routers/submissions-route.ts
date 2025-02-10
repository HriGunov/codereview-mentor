import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { feedbackSchema } from "~/schemas/feedback-schema";

export const submissionsRouter = createTRPCRouter({
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

  create: publicProcedure
    .input(
      z.object({
        code: z.string().min(30).max(500),
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
  /**
   * Normally I would not do this, I would add column to the DB tracking the deleted status.
   * Creating this endpoint because it's easier to play around with the app now that it is "finished"
   */
  deleteAll: publicProcedure.mutation(async function ({ ctx }) {
    await ctx.db.submission.deleteMany();
    await ctx.db.feedback.deleteMany();
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
