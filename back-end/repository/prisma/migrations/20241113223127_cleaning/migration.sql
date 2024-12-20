/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lecturer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseToLecturer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lecturer" DROP CONSTRAINT "Lecturer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_courseId_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToLecturer" DROP CONSTRAINT "_CourseToLecturer_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToLecturer" DROP CONSTRAINT "_CourseToLecturer_B_fkey";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Lecturer";

-- DropTable
DROP TABLE "Schedule";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_CourseToLecturer";
