/*
  Warnings:

  - You are about to drop the column `preBuilt` on the `Build` table. All the data in the column will be lost.
  - Added the required column `preBuild` to the `Build` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Build" DROP COLUMN "preBuilt",
ADD COLUMN     "preBuild" BOOLEAN NOT NULL;
