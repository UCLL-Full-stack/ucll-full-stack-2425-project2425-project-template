-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_playerId_fkey";

-- AlterTable
ALTER TABLE "Position" ALTER COLUMN "playerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
