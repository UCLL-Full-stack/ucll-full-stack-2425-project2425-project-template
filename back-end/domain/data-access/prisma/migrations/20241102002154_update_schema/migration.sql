/*
  Warnings:

  - You are about to drop the `_StudentBookings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StudentBookings" DROP CONSTRAINT "_StudentBookings_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentBookings" DROP CONSTRAINT "_StudentBookings_B_fkey";

-- DropTable
DROP TABLE "_StudentBookings";

-- CreateTable
CREATE TABLE "_BookingToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookingToStudent_AB_unique" ON "_BookingToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_BookingToStudent_B_index" ON "_BookingToStudent"("B");

-- AddForeignKey
ALTER TABLE "_BookingToStudent" ADD CONSTRAINT "_BookingToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToStudent" ADD CONSTRAINT "_BookingToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
