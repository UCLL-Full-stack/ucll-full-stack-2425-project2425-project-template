/*
  Warnings:

  - You are about to drop the column `itemId` on the `nutritionlabels` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nutritionLabelId]` on the table `items` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "nutritionlabels" DROP CONSTRAINT "nutritionlabels_itemId_fkey";

-- DropIndex
DROP INDEX "nutritionlabels_itemId_key";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "nutritionLabelId" INTEGER;

-- AlterTable
ALTER TABLE "nutritionlabels" DROP COLUMN "itemId";

-- CreateIndex
CREATE UNIQUE INDEX "items_nutritionLabelId_key" ON "items"("nutritionLabelId");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_nutritionLabelId_fkey" FOREIGN KEY ("nutritionLabelId") REFERENCES "nutritionlabels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
