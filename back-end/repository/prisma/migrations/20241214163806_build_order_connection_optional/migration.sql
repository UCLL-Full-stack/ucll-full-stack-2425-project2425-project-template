-- DropForeignKey
ALTER TABLE "Build" DROP CONSTRAINT "Build_orderId_fkey";

-- AlterTable
ALTER TABLE "Build" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Build" ADD CONSTRAINT "Build_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
