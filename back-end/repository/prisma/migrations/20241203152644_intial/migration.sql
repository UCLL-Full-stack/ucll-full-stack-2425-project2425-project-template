-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "transmission_type" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "vehicle_type" TEXT NOT NULL,
    "body_type" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);
