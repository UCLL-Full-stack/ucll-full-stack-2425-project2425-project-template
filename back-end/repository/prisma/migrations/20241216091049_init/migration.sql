-- AlterTable
ALTER TABLE "_BookingToStudent" ADD CONSTRAINT "_BookingToStudent_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_BookingToStudent_AB_unique";
