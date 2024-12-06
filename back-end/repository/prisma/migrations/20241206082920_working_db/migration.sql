/*
  Warnings:

  - You are about to drop the column `Category` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `nutritionLabelId` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `saturatedFat` on the `nutritionlabels` table. All the data in the column will be lost.
  - You are about to drop the column `Role` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itemId]` on the table `nutritionlabels` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saturatedFats` to the `nutritionlabels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_nutritionLabelId_fkey";

-- DropIndex
DROP INDEX "items_nutritionLabelId_key";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "Category",
DROP COLUMN "nutritionLabelId",
ADD COLUMN     "category" "Category" NOT NULL;

-- AlterTable
ALTER TABLE "nutritionlabels" DROP COLUMN "saturatedFat",
ADD COLUMN     "itemId" INTEGER,
ADD COLUMN     "saturatedFats" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "Role",
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "nutritionlabels_itemId_key" ON "nutritionlabels"("itemId");

-- AddForeignKey
ALTER TABLE "nutritionlabels" ADD CONSTRAINT "nutritionlabels_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
