-- CreateTable
CREATE TABLE "GroupChat" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupChat_pkey" PRIMARY KEY ("id")
);

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
