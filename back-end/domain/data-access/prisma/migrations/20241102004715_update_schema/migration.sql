/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Student` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Review_studentId_key";

-- DropIndex
DROP INDEX "Student_reviewId_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "reviewId";
