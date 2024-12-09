/*
  Warnings:

  - You are about to drop the `_MatchPlayers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TeamMembers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TrainingPlayers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MatchPlayers" DROP CONSTRAINT "_MatchPlayers_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatchPlayers" DROP CONSTRAINT "_MatchPlayers_B_fkey";

-- DropForeignKey
ALTER TABLE "_TeamMembers" DROP CONSTRAINT "_TeamMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamMembers" DROP CONSTRAINT "_TeamMembers_B_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingPlayers" DROP CONSTRAINT "_TrainingPlayers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingPlayers" DROP CONSTRAINT "_TrainingPlayers_B_fkey";

-- DropTable
DROP TABLE "_MatchPlayers";

-- DropTable
DROP TABLE "_TeamMembers";

-- DropTable
DROP TABLE "_TrainingPlayers";

-- CreateTable
CREATE TABLE "_UserToTrainings" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserToTeams" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserToMatches" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToTrainings_AB_unique" ON "_UserToTrainings"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToTrainings_B_index" ON "_UserToTrainings"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToTeams_AB_unique" ON "_UserToTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToTeams_B_index" ON "_UserToTeams"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToMatches_AB_unique" ON "_UserToMatches"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToMatches_B_index" ON "_UserToMatches"("B");

-- AddForeignKey
ALTER TABLE "_UserToTrainings" ADD CONSTRAINT "_UserToTrainings_A_fkey" FOREIGN KEY ("A") REFERENCES "Training"("trainingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToTrainings" ADD CONSTRAINT "_UserToTrainings_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToTeams" ADD CONSTRAINT "_UserToTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("teamId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToTeams" ADD CONSTRAINT "_UserToTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToMatches" ADD CONSTRAINT "_UserToMatches_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("matchId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToMatches" ADD CONSTRAINT "_UserToMatches_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
