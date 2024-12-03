/*
  Warnings:

  - You are about to drop the column `body_type` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `fuel_type` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `transmission_type` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vehicle_type` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `bodyType` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `engineCapacity` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelType` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmissionType` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleType` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "body_type",
DROP COLUMN "fuel_type",
DROP COLUMN "transmission_type",
DROP COLUMN "vehicle_type",
ADD COLUMN     "bodyType" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "engineCapacity" INTEGER NOT NULL,
ADD COLUMN     "fuelType" TEXT NOT NULL,
ADD COLUMN     "transmissionType" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vehicleType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
