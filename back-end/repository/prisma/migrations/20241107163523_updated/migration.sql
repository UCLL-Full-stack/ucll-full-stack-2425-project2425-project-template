/*
  Warnings:

  - The primary key for the `Board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdByUser` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Board` table. All the data in the column will be lost.
  - The primary key for the `Column` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Column` table. All the data in the column will be lost.
  - The primary key for the `Guild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Guild` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignees` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `taskDescription` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `taskName` on the `Task` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionEntry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdByUserId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissions` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `columnIndex` to the `Column` table without a default value. This is not possible if the table is not empty.
  - Made the column `boardId` on table `Column` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `members` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `settings` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `permissions` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `guildId` on table `Role` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `columnId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_guildId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionEntry" DROP CONSTRAINT "PermissionEntry_boardId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionEntry" DROP CONSTRAINT "PermissionEntry_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_columnId_fkey";

-- DropForeignKey
ALTER TABLE "_UserGuilds" DROP CONSTRAINT "_UserGuilds_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserGuilds" DROP CONSTRAINT "_UserGuilds_B_fkey";

-- DropIndex
DROP INDEX "Board_boardId_key";

-- DropIndex
DROP INDEX "Column_columnId_key";

-- DropIndex
DROP INDEX "Guild_guildId_key";

-- DropIndex
DROP INDEX "Role_roleId_key";

-- DropIndex
DROP INDEX "Task_taskId_key";

-- DropIndex
DROP INDEX "User_userId_key";

-- AlterTable
ALTER TABLE "Board" DROP CONSTRAINT "Board_pkey",
DROP COLUMN "createdByUser",
DROP COLUMN "id",
ADD COLUMN     "createdByUserId" TEXT NOT NULL,
ADD COLUMN     "permissions" JSONB NOT NULL,
ADD CONSTRAINT "Board_pkey" PRIMARY KEY ("boardId");

-- AlterTable
ALTER TABLE "Column" DROP CONSTRAINT "Column_pkey",
DROP COLUMN "id",
ADD COLUMN     "columnIndex" INTEGER NOT NULL,
ALTER COLUMN "boardId" SET NOT NULL,
ADD CONSTRAINT "Column_pkey" PRIMARY KEY ("columnId");

-- AlterTable
ALTER TABLE "Guild" DROP CONSTRAINT "Guild_pkey",
DROP COLUMN "id",
ADD COLUMN     "members" JSONB NOT NULL,
ADD COLUMN     "settings" JSONB NOT NULL,
ADD CONSTRAINT "Guild_pkey" PRIMARY KEY ("guildId");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "id",
DROP COLUMN "permissions",
ADD COLUMN     "permissions" JSONB NOT NULL,
ALTER COLUMN "guildId" SET NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId");

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
DROP COLUMN "assignees",
DROP COLUMN "id",
DROP COLUMN "taskDescription",
DROP COLUMN "taskName",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "columnId" SET NOT NULL,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("taskId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "PermissionEntry";

-- DropEnum
DROP TYPE "DiscordPermission";

-- DropEnum
DROP TYPE "KanbanPermission";

-- CreateTable
CREATE TABLE "_TaskToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskToUser_AB_unique" ON "_TaskToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskToUser_B_index" ON "_TaskToUser"("B");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("boardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("columnId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGuilds" ADD CONSTRAINT "_UserGuilds_A_fkey" FOREIGN KEY ("A") REFERENCES "Guild"("guildId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGuilds" ADD CONSTRAINT "_UserGuilds_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD CONSTRAINT "_TaskToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("taskId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD CONSTRAINT "_TaskToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
