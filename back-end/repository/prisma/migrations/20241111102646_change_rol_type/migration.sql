/*
  Warnings:

  - Changed the type of `type` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rol` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('Admin', 'Klant', 'Manager');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Topping', 'Protein', 'Sauce');

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "rol",
ADD COLUMN     "rol" "Rol" NOT NULL;
