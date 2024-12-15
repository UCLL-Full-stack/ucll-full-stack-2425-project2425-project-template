/*
  Warnings:

  - You are about to drop the column `albumIDs` on the `List` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "List" DROP COLUMN "albumIDs",
ADD COLUMN     "albumIds" INTEGER[];
