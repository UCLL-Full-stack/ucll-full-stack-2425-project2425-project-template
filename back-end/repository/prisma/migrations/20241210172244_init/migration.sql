-- CreateEnum
CREATE TYPE "Category" AS ENUM ('fruits', 'vegetables', 'dairy');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shoppingcarts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "shoppingcarts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "pathToImage" TEXT NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutritionlabels" (
    "id" SERIAL NOT NULL,
    "energy" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "saturatedFats" DOUBLE PRECISION NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "sugar" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "salts" DOUBLE PRECISION NOT NULL,
    "itemId" INTEGER,

    CONSTRAINT "nutritionlabels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToShoppingcart" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "nutritionlabels_itemId_key" ON "nutritionlabels"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToShoppingcart_AB_unique" ON "_ItemToShoppingcart"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToShoppingcart_B_index" ON "_ItemToShoppingcart"("B");

-- AddForeignKey
ALTER TABLE "shoppingcarts" ADD CONSTRAINT "shoppingcarts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutritionlabels" ADD CONSTRAINT "nutritionlabels_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToShoppingcart" ADD CONSTRAINT "_ItemToShoppingcart_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToShoppingcart" ADD CONSTRAINT "_ItemToShoppingcart_B_fkey" FOREIGN KEY ("B") REFERENCES "shoppingcarts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
