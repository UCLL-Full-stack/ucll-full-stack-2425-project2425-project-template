/*
  Warnings:

  - You are about to drop the `_ChatToGroupChat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupChatToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChatToGroupChat" DROP CONSTRAINT "_ChatToGroupChat_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToGroupChat" DROP CONSTRAINT "_ChatToGroupChat_B_fkey";

-- DropForeignKey
ALTER TABLE "_GroupChatToUser" DROP CONSTRAINT "_GroupChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupChatToUser" DROP CONSTRAINT "_GroupChatToUser_B_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "groupChatId" INTEGER;

-- DropTable
DROP TABLE "_ChatToGroupChat";

-- DropTable
DROP TABLE "_GroupChatToUser";

-- CreateTable
CREATE TABLE "_UserGroupChats" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserGroupChats_AB_unique" ON "_UserGroupChats"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGroupChats_B_index" ON "_UserGroupChats"("B");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_groupChatId_fkey" FOREIGN KEY ("groupChatId") REFERENCES "GroupChat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroupChats" ADD CONSTRAINT "_UserGroupChats_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroupChats" ADD CONSTRAINT "_UserGroupChats_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
