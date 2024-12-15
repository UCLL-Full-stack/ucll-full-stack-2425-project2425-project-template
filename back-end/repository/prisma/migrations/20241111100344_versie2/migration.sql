/*
  Warnings:

  - You are about to drop the column `pokebowlId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `bestellingId` on the `Pokebowl` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_pokebowlId_fkey";

-- DropForeignKey
ALTER TABLE "Pokebowl" DROP CONSTRAINT "Pokebowl_bestellingId_fkey";

-- DropIndex
DROP INDEX "Bestelling_userId_key";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "pokebowlId";

-- AlterTable
ALTER TABLE "Pokebowl" DROP COLUMN "bestellingId";

-- CreateTable
CREATE TABLE "_PokebowlIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BestellingPokebowl" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PokebowlIngredient_AB_unique" ON "_PokebowlIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_PokebowlIngredient_B_index" ON "_PokebowlIngredient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BestellingPokebowl_AB_unique" ON "_BestellingPokebowl"("A", "B");

-- CreateIndex
CREATE INDEX "_BestellingPokebowl_B_index" ON "_BestellingPokebowl"("B");

-- AddForeignKey
ALTER TABLE "_PokebowlIngredient" ADD CONSTRAINT "_PokebowlIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokebowlIngredient" ADD CONSTRAINT "_PokebowlIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Pokebowl"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BestellingPokebowl" ADD CONSTRAINT "_BestellingPokebowl_A_fkey" FOREIGN KEY ("A") REFERENCES "Bestelling"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BestellingPokebowl" ADD CONSTRAINT "_BestellingPokebowl_B_fkey" FOREIGN KEY ("B") REFERENCES "Pokebowl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
