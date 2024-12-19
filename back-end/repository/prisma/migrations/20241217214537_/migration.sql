/*
  Warnings:

  - A unique constraint covering the columns `[workoutId,exerciseId]` on the table `WorkoutExercise` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "videoLink" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExercise" ALTER COLUMN "sets" DROP NOT NULL,
ALTER COLUMN "reps" DROP NOT NULL,
ALTER COLUMN "rpe" DROP NOT NULL,
ALTER COLUMN "restTime" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExercise_workoutId_exerciseId_key" ON "WorkoutExercise"("workoutId", "exerciseId");
