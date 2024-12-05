/*
  Warnings:

  - A unique constraint covering the columns `[vehicleId]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vehicleId]` on the table `Motorcycle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vehicleId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleId` to the `Motorcycle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "vehicleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Motorcycle" ADD COLUMN     "vehicleId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Car_vehicleId_key" ON "Car"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_vehicleId_key" ON "Motorcycle"("vehicleId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motorcycle" ADD CONSTRAINT "Motorcycle_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
