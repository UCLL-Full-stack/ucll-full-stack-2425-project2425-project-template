/*
  Warnings:

  - You are about to drop the column `date` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "scheduledDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
