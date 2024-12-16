/*
  Warnings:

  - You are about to drop the `UserLikesReview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserLikesReview" DROP CONSTRAINT "UserLikesReview_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "UserLikesReview" DROP CONSTRAINT "UserLikesReview_userId_fkey";

-- DropTable
DROP TABLE "UserLikesReview";

-- CreateTable
CREATE TABLE "_userLikesReview" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userLikesReview_AB_unique" ON "_userLikesReview"("A", "B");

-- CreateIndex
CREATE INDEX "_userLikesReview_B_index" ON "_userLikesReview"("B");

-- AddForeignKey
ALTER TABLE "_userLikesReview" ADD CONSTRAINT "_userLikesReview_A_fkey" FOREIGN KEY ("A") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userLikesReview" ADD CONSTRAINT "_userLikesReview_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
