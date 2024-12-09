/*
  Warnings:

  - A unique constraint covering the columns `[userId,teamId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_userId_teamId_key" ON "User"("userId", "teamId");
