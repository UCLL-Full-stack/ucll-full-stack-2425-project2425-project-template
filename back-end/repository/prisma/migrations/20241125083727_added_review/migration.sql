-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "releaseDate" SET DATA TYPE TIME;

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(255) NOT NULL,
    "body" VARCHAR(2048) NOT NULL,
    "starRating" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,
    "likeCount" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
