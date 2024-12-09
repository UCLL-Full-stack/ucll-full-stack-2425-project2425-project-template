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
    "teamId" INTEGER,

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
CREATE TABLE "_UserToTrainings" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserToMatches" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_teamId_key" ON "User"("userId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToTrainings_AB_unique" ON "_UserToTrainings"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToTrainings_B_index" ON "_UserToTrainings"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToMatches_AB_unique" ON "_UserToMatches"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToMatches_B_index" ON "_UserToMatches"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToTrainings" ADD CONSTRAINT "_UserToTrainings_A_fkey" FOREIGN KEY ("A") REFERENCES "Training"("trainingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToTrainings" ADD CONSTRAINT "_UserToTrainings_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToMatches" ADD CONSTRAINT "_UserToMatches_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("matchId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToMatches" ADD CONSTRAINT "_UserToMatches_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
