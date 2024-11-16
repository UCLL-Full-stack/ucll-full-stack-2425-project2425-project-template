/*
  Warnings:

  - The primary key for the `projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `projectId` on the `projects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_projectId_fkey";

-- DropForeignKey
ALTER TABLE "user_projects" DROP CONSTRAINT "user_projects_projectId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP CONSTRAINT "projects_pkey",
DROP COLUMN "projectId",
ADD COLUMN     "project_Id" SERIAL NOT NULL,
ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("project_Id");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("project_Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("project_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
