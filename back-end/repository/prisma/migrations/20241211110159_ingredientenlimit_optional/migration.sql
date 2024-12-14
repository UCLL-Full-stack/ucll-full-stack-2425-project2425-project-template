-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "ingredientLimit" DROP NOT NULL,
ALTER COLUMN "ingredientLimit" DROP DEFAULT;
