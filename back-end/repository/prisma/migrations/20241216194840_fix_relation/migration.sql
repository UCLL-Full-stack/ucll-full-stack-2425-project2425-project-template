/*
  Warnings:

  - A unique constraint covering the columns `[exerciseId]` on the table `WorkoutExercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExercise_exerciseId_key" ON "WorkoutExercise"("exerciseId");
