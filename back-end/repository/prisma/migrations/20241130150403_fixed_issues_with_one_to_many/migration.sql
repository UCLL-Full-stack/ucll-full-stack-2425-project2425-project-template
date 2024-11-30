/*
  Warnings:

  - You are about to drop the column `crashId` on the `Race` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Race" DROP CONSTRAINT "Race_crashId_fkey";

-- AlterTable
ALTER TABLE "Race" DROP COLUMN "crashId";

-- CreateTable
CREATE TABLE "_CrashToRace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CrashToRace_AB_unique" ON "_CrashToRace"("A", "B");

-- CreateIndex
CREATE INDEX "_CrashToRace_B_index" ON "_CrashToRace"("B");

-- AddForeignKey
ALTER TABLE "_CrashToRace" ADD CONSTRAINT "_CrashToRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Crash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrashToRace" ADD CONSTRAINT "_CrashToRace_B_fkey" FOREIGN KEY ("B") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;
