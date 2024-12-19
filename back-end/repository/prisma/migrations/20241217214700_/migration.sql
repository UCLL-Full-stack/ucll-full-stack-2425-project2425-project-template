/*
  Warnings:

  - Made the column `description` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `videoLink` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Workout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sets` on table `WorkoutExercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reps` on table `WorkoutExercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rpe` on table `WorkoutExercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `restTime` on table `WorkoutExercise` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "WorkoutExercise_workoutId_exerciseId_key";

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "videoLink" SET NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExercise" ALTER COLUMN "sets" SET NOT NULL,
ALTER COLUMN "reps" SET NOT NULL,
ALTER COLUMN "rpe" SET NOT NULL,
ALTER COLUMN "restTime" SET NOT NULL;
