/*
  Warnings:

  - You are about to drop the `_CartProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartProducts" DROP CONSTRAINT "_CartProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartProducts" DROP CONSTRAINT "_CartProducts_B_fkey";

-- DropTable
DROP TABLE "_CartProducts";

-- CreateTable
CREATE TABLE "CartProducts" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CartProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartProducts" ADD CONSTRAINT "CartProducts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProducts" ADD CONSTRAINT "CartProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
