/*
  Warnings:

  - You are about to drop the `_BestellingPokebowl` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PokebowlIngredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BestellingPokebowl" DROP CONSTRAINT "_BestellingPokebowl_A_fkey";

-- DropForeignKey
ALTER TABLE "_BestellingPokebowl" DROP CONSTRAINT "_BestellingPokebowl_B_fkey";

-- DropForeignKey
ALTER TABLE "_PokebowlIngredient" DROP CONSTRAINT "_PokebowlIngredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_PokebowlIngredient" DROP CONSTRAINT "_PokebowlIngredient_B_fkey";

-- DropTable
DROP TABLE "_BestellingPokebowl";

-- DropTable
DROP TABLE "_PokebowlIngredient";

-- CreateTable
CREATE TABLE "_IngredientToPokebowl" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BestellingToPokebowl" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToPokebowl_AB_unique" ON "_IngredientToPokebowl"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToPokebowl_B_index" ON "_IngredientToPokebowl"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BestellingToPokebowl_AB_unique" ON "_BestellingToPokebowl"("A", "B");

-- CreateIndex
CREATE INDEX "_BestellingToPokebowl_B_index" ON "_BestellingToPokebowl"("B");

-- AddForeignKey
ALTER TABLE "_IngredientToPokebowl" ADD CONSTRAINT "_IngredientToPokebowl_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToPokebowl" ADD CONSTRAINT "_IngredientToPokebowl_B_fkey" FOREIGN KEY ("B") REFERENCES "Pokebowl"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BestellingToPokebowl" ADD CONSTRAINT "_BestellingToPokebowl_A_fkey" FOREIGN KEY ("A") REFERENCES "Bestelling"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BestellingToPokebowl" ADD CONSTRAINT "_BestellingToPokebowl_B_fkey" FOREIGN KEY ("B") REFERENCES "Pokebowl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
