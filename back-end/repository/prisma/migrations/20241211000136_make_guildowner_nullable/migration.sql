-- DropForeignKey
ALTER TABLE "Guild" DROP CONSTRAINT "Guild_guildOwnerId_fkey";

-- AlterTable
ALTER TABLE "Guild" ALTER COLUMN "guildOwnerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Guild" ADD CONSTRAINT "Guild_guildOwnerId_fkey" FOREIGN KEY ("guildOwnerId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
