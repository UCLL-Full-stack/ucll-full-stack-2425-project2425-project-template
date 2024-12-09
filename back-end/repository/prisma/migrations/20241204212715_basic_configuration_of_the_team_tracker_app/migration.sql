-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PLAYER', 'COACH', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "attendance" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Training" (
    "trainingId" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hall" TEXT NOT NULL,
    "square" INTEGER NOT NULL,
    "coachId" INTEGER NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("trainingId")
);

-- CreateTable
CREATE TABLE "Team" (
    "teamId" SERIAL NOT NULL,
    "coachId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("teamId")
);

-- CreateTable
CREATE TABLE "Match" (
    "matchId" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hall" TEXT NOT NULL,
    "square" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("matchId")
);

-- CreateTable
CREATE TABLE "_TrainingPlayers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TeamMembers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MatchPlayers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TrainingPlayers_AB_unique" ON "_TrainingPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_TrainingPlayers_B_index" ON "_TrainingPlayers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamMembers_AB_unique" ON "_TeamMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamMembers_B_index" ON "_TeamMembers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MatchPlayers_AB_unique" ON "_MatchPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_MatchPlayers_B_index" ON "_MatchPlayers"("B");

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingPlayers" ADD CONSTRAINT "_TrainingPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Training"("trainingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingPlayers" ADD CONSTRAINT "_TrainingPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMembers" ADD CONSTRAINT "_TeamMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("teamId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMembers" ADD CONSTRAINT "_TeamMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchPlayers" ADD CONSTRAINT "_MatchPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("matchId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchPlayers" ADD CONSTRAINT "_MatchPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
