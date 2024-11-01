/*
  Warnings:

  - You are about to drop the column `studentId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `bookingId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `_Favourites` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "_Favourites" DROP CONSTRAINT "_Favourites_A_fkey";

-- DropForeignKey
ALTER TABLE "_Favourites" DROP CONSTRAINT "_Favourites_B_fkey";

-- DropIndex
DROP INDEX "Review_bookingId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "bookingId";

-- DropTable
DROP TABLE "_Favourites";

-- CreateTable
CREATE TABLE "_StudentBookings" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StudentBookings_AB_unique" ON "_StudentBookings"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentBookings_B_index" ON "_StudentBookings"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Review_studentId_key" ON "Review"("studentId");

-- AddForeignKey
ALTER TABLE "_StudentBookings" ADD CONSTRAINT "_StudentBookings_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentBookings" ADD CONSTRAINT "_StudentBookings_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
