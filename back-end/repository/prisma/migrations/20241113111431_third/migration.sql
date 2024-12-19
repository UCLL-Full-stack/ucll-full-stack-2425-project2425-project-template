/*
  Warnings:

  - You are about to drop the column `end` on the `Floor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Floor" DROP COLUMN "end";

-- CreateTable
CREATE TABLE "Line" (
    "id" SERIAL NOT NULL,
    "tiles" TEXT[],
    "lineNum" INTEGER NOT NULL,
    "floorId" INTEGER NOT NULL,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "Floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
