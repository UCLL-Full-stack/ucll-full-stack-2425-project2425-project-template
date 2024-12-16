-- CreateTable
CREATE TABLE "_userLikesList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userLikesList_AB_unique" ON "_userLikesList"("A", "B");

-- CreateIndex
CREATE INDEX "_userLikesList_B_index" ON "_userLikesList"("B");

-- AddForeignKey
ALTER TABLE "_userLikesList" ADD CONSTRAINT "_userLikesList_A_fkey" FOREIGN KEY ("A") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userLikesList" ADD CONSTRAINT "_userLikesList_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
