-- CreateTable
CREATE TABLE "FavouriteCars" (
    "userId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "FavouriteCars_pkey" PRIMARY KEY ("userId","vehicleId")
);

-- AddForeignKey
ALTER TABLE "FavouriteCars" ADD CONSTRAINT "FavouriteCars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteCars" ADD CONSTRAINT "FavouriteCars_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
