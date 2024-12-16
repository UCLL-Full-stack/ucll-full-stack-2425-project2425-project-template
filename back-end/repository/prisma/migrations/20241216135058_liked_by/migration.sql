/*
  Warnings:

  - You are about to drop the column `likeCount` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `likeCount` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "likeCount";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "likeCount";

-- CreateTable
CREATE TABLE "UserLikesReview" (
    "reviewId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserLikesReview_pkey" PRIMARY KEY ("reviewId","userId")
);

-- AddForeignKey
ALTER TABLE "UserLikesReview" ADD CONSTRAINT "UserLikesReview_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikesReview" ADD CONSTRAINT "UserLikesReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
