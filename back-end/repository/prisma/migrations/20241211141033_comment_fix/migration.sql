/*
  Warnings:

  - You are about to drop the column `albumID` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `starRating` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "albumID",
DROP COLUMN "starRating",
DROP COLUMN "title";
