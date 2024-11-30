/*
  Warnings:

  - You are about to drop the column `groupChatId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the `_UserGroupChats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_groupChatId_fkey";

-- DropForeignKey
ALTER TABLE "_UserGroupChats" DROP CONSTRAINT "_UserGroupChats_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserGroupChats" DROP CONSTRAINT "_UserGroupChats_B_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "groupChatId";

-- DropTable
DROP TABLE "_UserGroupChats";

-- CreateTable
CREATE TABLE "_ChatToGroupChat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupChatToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToGroupChat_AB_unique" ON "_ChatToGroupChat"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatToGroupChat_B_index" ON "_ChatToGroupChat"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupChatToUser_AB_unique" ON "_GroupChatToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupChatToUser_B_index" ON "_GroupChatToUser"("B");

-- AddForeignKey
ALTER TABLE "_ChatToGroupChat" ADD CONSTRAINT "_ChatToGroupChat_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToGroupChat" ADD CONSTRAINT "_ChatToGroupChat_B_fkey" FOREIGN KEY ("B") REFERENCES "GroupChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupChatToUser" ADD CONSTRAINT "_GroupChatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupChatToUser" ADD CONSTRAINT "_GroupChatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
