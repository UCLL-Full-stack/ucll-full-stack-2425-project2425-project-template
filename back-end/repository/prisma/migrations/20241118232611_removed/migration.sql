/*
  Warnings:

  - You are about to drop the column `columnIds` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `taskIds` on the `Column` table. All the data in the column will be lost.
  - You are about to drop the column `boardIds` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `roleIds` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `userIds` on the `Guild` table. All the data in the column will be lost.
  - You are about to drop the column `assigneeIds` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `guildIds` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "columnIds";

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "taskIds";

-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "boardIds",
DROP COLUMN "roleIds",
DROP COLUMN "userIds";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assigneeIds";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "guildIds";
