/*
  Warnings:

  - You are about to drop the column `message` on the `GroupChat` table. All the data in the column will be lost.
  - Added the required column `description` to the `GroupChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `GroupChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupChat" DROP COLUMN "message",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
