/*
  Warnings:

  - You are about to drop the column `attack` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `defence` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `hp` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `specialAttack` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `specialDefence` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `Pokemon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[statsId]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `statsId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "attack",
DROP COLUMN "defence",
DROP COLUMN "hp",
DROP COLUMN "specialAttack",
DROP COLUMN "specialDefence",
DROP COLUMN "speed",
ADD COLUMN     "statsId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defence" INTEGER NOT NULL,
    "specialAttack" INTEGER NOT NULL,
    "specialDefence" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_statsId_key" ON "Pokemon"("statsId");

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "Stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
