/*
  Warnings:

  - You are about to drop the `_PlaylistToSong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlaylistToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PlaylistToSong" DROP CONSTRAINT "_PlaylistToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToSong" DROP CONSTRAINT "_PlaylistToSong_B_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToUser" DROP CONSTRAINT "_PlaylistToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistToUser" DROP CONSTRAINT "_PlaylistToUser_B_fkey";

-- DropTable
DROP TABLE "_PlaylistToSong";

-- DropTable
DROP TABLE "_PlaylistToUser";

-- CreateTable
CREATE TABLE "_PlaylistSongs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserPlaylists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistSongs_AB_unique" ON "_PlaylistSongs"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistSongs_B_index" ON "_PlaylistSongs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserPlaylists_AB_unique" ON "_UserPlaylists"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPlaylists_B_index" ON "_UserPlaylists"("B");

-- AddForeignKey
ALTER TABLE "_PlaylistSongs" ADD CONSTRAINT "_PlaylistSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistSongs" ADD CONSTRAINT "_PlaylistSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPlaylists" ADD CONSTRAINT "_UserPlaylists_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPlaylists" ADD CONSTRAINT "_UserPlaylists_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
