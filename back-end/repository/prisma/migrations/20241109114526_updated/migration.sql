-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "columnIds" TEXT[];

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "taskIds" TEXT[];

-- AlterTable
ALTER TABLE "Guild" ADD COLUMN     "boardIds" TEXT[],
ADD COLUMN     "roleIds" TEXT[],
ADD COLUMN     "userIds" TEXT[];

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assigneeIds" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "guildIds" TEXT[];
