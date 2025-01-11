/*
  Warnings:

  - Added the required column `wachtwoord` to the `Leiding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leiding" ADD COLUMN     "wachtwoord" TEXT NOT NULL;
