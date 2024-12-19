/*
  Warnings:

  - You are about to drop the column `accountbirthday` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountbirthday",
ADD COLUMN     "accountBirthday" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
