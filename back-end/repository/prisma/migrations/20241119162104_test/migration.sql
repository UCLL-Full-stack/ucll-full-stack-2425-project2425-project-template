/*
  Warnings:

  - You are about to drop the `TeamsInGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamsInGame" DROP CONSTRAINT "TeamsInGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "TeamsInGame" DROP CONSTRAINT "TeamsInGame_teamId_fkey";

-- DropTable
DROP TABLE "TeamsInGame";

-- CreateTable
CREATE TABLE "TeamGame" (
    "teamId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "TeamGame_pkey" PRIMARY KEY ("teamId","gameId")
);

-- AddForeignKey
ALTER TABLE "TeamGame" ADD CONSTRAINT "TeamGame_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamGame" ADD CONSTRAINT "TeamGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
