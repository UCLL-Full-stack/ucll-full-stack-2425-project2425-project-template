/*
  Warnings:

  - You are about to drop the column `order` on the `WorkoutExercise` table. All the data in the column will be lost.
  - Added the required column `restTime` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rpe` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "order",
ADD COLUMN     "restTime" TEXT NOT NULL,
ADD COLUMN     "rpe" TEXT NOT NULL;
