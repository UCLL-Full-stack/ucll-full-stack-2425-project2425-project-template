/*
  Warnings:

  - Added the required column `coachId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "coachId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
