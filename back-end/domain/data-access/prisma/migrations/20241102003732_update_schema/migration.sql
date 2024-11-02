/*
  Warnings:

  - A unique constraint covering the columns `[reviewId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "reviewId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Student_reviewId_key" ON "Student"("reviewId");
