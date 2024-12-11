/*
  Warnings:

  - Made the column `ingredientLimit` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "ingredientLimit" SET NOT NULL;
