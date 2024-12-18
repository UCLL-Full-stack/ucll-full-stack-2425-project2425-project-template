/*
  Warnings:

  - A unique constraint covering the columns `[totem]` on the table `Leiding` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Leiding_totem_key" ON "Leiding"("totem");
