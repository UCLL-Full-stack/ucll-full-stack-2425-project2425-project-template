/*
  Warnings:

  - You are about to drop the column `auteurId` on the `Nieuwsbericht` table. All the data in the column will be lost.
  - Made the column `groepId` on table `Leiding` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `leidingId` to the `Nieuwsbericht` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Leiding" DROP CONSTRAINT "Leiding_groepId_fkey";

-- DropForeignKey
ALTER TABLE "Nieuwsbericht" DROP CONSTRAINT "Nieuwsbericht_auteurId_fkey";

-- AlterTable
ALTER TABLE "Leiding" ALTER COLUMN "groepId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Nieuwsbericht" DROP COLUMN "auteurId",
ADD COLUMN     "leidingId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Leiding" ADD CONSTRAINT "Leiding_groepId_fkey" FOREIGN KEY ("groepId") REFERENCES "Groep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nieuwsbericht" ADD CONSTRAINT "Nieuwsbericht_leidingId_fkey" FOREIGN KEY ("leidingId") REFERENCES "Leiding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
