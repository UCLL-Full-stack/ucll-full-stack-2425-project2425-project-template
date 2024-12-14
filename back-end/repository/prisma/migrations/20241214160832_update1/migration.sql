/*
  Warnings:

  - You are about to drop the `_BuildParts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BuildParts" DROP CONSTRAINT "_BuildParts_A_fkey";

-- DropForeignKey
ALTER TABLE "_BuildParts" DROP CONSTRAINT "_BuildParts_B_fkey";

-- DropTable
DROP TABLE "_BuildParts";

-- CreateTable
CREATE TABLE "_BuildToPart" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BuildToPart_AB_unique" ON "_BuildToPart"("A", "B");

-- CreateIndex
CREATE INDEX "_BuildToPart_B_index" ON "_BuildToPart"("B");

-- AddForeignKey
ALTER TABLE "_BuildToPart" ADD CONSTRAINT "_BuildToPart_A_fkey" FOREIGN KEY ("A") REFERENCES "Build"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuildToPart" ADD CONSTRAINT "_BuildToPart_B_fkey" FOREIGN KEY ("B") REFERENCES "Part"("id") ON DELETE CASCADE ON UPDATE CASCADE;
