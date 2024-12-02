/*
  Warnings:

  - You are about to drop the column `StoryPoints` on the `Task` table. All the data in the column will be lost.
  - Added the required column `storyPoints` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "StoryPoints",
ADD COLUMN     "storyPoints" INTEGER NOT NULL;
