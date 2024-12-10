/*
  Warnings:

  - You are about to drop the `_ItemToShoppingcart` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Category" ADD VALUE 'meat';
ALTER TYPE "Category" ADD VALUE 'fish';

-- DropForeignKey
ALTER TABLE "_ItemToShoppingcart" DROP CONSTRAINT "_ItemToShoppingcart_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToShoppingcart" DROP CONSTRAINT "_ItemToShoppingcart_B_fkey";

-- DropTable
DROP TABLE "_ItemToShoppingcart";

-- CreateTable
CREATE TABLE "shoppingcart_items" (
    "shoppingcartId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "shoppingcart_items_pkey" PRIMARY KEY ("shoppingcartId","itemId")
);

-- AddForeignKey
ALTER TABLE "shoppingcart_items" ADD CONSTRAINT "shoppingcart_items_shoppingcartId_fkey" FOREIGN KEY ("shoppingcartId") REFERENCES "shoppingcarts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shoppingcart_items" ADD CONSTRAINT "shoppingcart_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
