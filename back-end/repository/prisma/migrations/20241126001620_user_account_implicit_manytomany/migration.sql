/*
  Warnings:

  - You are about to drop the `_UserAccounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserAccounts" DROP CONSTRAINT "_UserAccounts_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserAccounts" DROP CONSTRAINT "_UserAccounts_B_fkey";

-- DropTable
DROP TABLE "_UserAccounts";

-- CreateTable
CREATE TABLE "_AccountToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToUser_AB_unique" ON "_AccountToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToUser_B_index" ON "_AccountToUser"("B");

-- AddForeignKey
ALTER TABLE "_AccountToUser" ADD CONSTRAINT "_AccountToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToUser" ADD CONSTRAINT "_AccountToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
