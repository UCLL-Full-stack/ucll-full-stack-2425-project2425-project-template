/*
  Warnings:

  - Made the column `prijs` on table `Pokebowl` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pokebowl" ALTER COLUMN "prijs" SET NOT NULL;
