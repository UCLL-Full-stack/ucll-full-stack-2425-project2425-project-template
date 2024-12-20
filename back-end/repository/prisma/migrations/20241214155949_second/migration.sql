/*
  Warnings:

  - You are about to drop the `Stat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stat" DROP CONSTRAINT "Stat_playerId_fkey";

-- DropTable
DROP TABLE "Stat";

-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "appearances" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stats_playerId_key" ON "Stats"("playerId");

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
