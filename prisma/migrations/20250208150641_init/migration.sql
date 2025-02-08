/*
  Warnings:

  - You are about to drop the column `feedback` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `feedbackId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shortSummary" TEXT NOT NULL,
    "keyFindings" TEXT NOT NULL,
    "criticalRecommendations" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Submission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Submission_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Submission" ("code", "createdAt", "id", "language") SELECT "code", "createdAt", "id", "language" FROM "Submission";
DROP TABLE "Submission";
ALTER TABLE "new_Submission" RENAME TO "Submission";
CREATE UNIQUE INDEX "Submission_feedbackId_key" ON "Submission"("feedbackId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
