/*
  Warnings:

  - You are about to drop the `_UserToTeams` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[teamId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_UserToTeams" DROP CONSTRAINT "_UserToTeams_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToTeams" DROP CONSTRAINT "_UserToTeams_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "teamId" INTEGER;

-- DropTable
DROP TABLE "_UserToTeams";

-- CreateIndex
CREATE UNIQUE INDEX "User_teamId_key" ON "User"("teamId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE SET NULL ON UPDATE CASCADE;
