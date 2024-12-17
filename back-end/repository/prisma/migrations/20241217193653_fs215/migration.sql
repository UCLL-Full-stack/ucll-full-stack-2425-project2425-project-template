/*
  Warnings:

  - The primary key for the `_BookingToStudent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_BookingToStudent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_BookingToStudent" DROP CONSTRAINT "_BookingToStudent_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_BookingToStudent_AB_unique" ON "_BookingToStudent"("A", "B");
