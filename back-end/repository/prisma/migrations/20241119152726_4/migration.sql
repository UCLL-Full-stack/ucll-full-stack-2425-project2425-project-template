/*
  Warnings:

  - You are about to drop the column `gameId` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "result" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "gameId";

-- CreateTable
CREATE TABLE "TeamsInGame" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "TeamsInGame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamsInGame" ADD CONSTRAINT "TeamsInGame_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsInGame" ADD CONSTRAINT "TeamsInGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
