-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "fuelType" TEXT NOT NULL,
    "transmissionType" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "engineCapacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motorcycle" (
    "id" SERIAL NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "fuelType" TEXT NOT NULL,
    "transmissionType" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "engineCapacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Motorcycle_pkey" PRIMARY KEY ("id")
);
