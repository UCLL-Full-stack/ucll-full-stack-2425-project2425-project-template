-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crash" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Crash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "descritpion" TEXT NOT NULL,
    "racecarId" INTEGER NOT NULL,
    "crashId" INTEGER NOT NULL,
    "raceId" INTEGER NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Racecar" (
    "id" SERIAL NOT NULL,
    "car_name" TEXT NOT NULL,

    CONSTRAINT "Racecar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission_form" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "Submission_form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdminToRace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RaceToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RaceToSubmission_form" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_AdminToRace_AB_unique" ON "_AdminToRace"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminToRace_B_index" ON "_AdminToRace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RaceToUser_AB_unique" ON "_RaceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RaceToUser_B_index" ON "_RaceToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RaceToSubmission_form_AB_unique" ON "_RaceToSubmission_form"("A", "B");

-- CreateIndex
CREATE INDEX "_RaceToSubmission_form_B_index" ON "_RaceToSubmission_form"("B");

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_racecar_fkey" FOREIGN KEY ("racecarId") REFERENCES "Racecar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_crash_fkey" FOREIGN KEY ("crashId") REFERENCES "Crash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission_form" ADD CONSTRAINT "User_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToRace" ADD CONSTRAINT "_AdminToRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToRace" ADD CONSTRAINT "_AdminToRace_B_fkey" FOREIGN KEY ("B") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToUser" ADD CONSTRAINT "_RaceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToUser" ADD CONSTRAINT "_RaceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToSubmission_form" ADD CONSTRAINT "_RaceToSubmission_form_A_fkey" FOREIGN KEY ("A") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RaceToSubmission_form" ADD CONSTRAINT "_RaceToSubmission_form_B_fkey" FOREIGN KEY ("B") REFERENCES "Submission_form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
