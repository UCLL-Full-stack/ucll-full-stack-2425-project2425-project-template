-- CreateTable
CREATE TABLE "Leiding" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,
    "voornaam" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefoon" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "totem" TEXT NOT NULL,
    "groepId" INTEGER,

    CONSTRAINT "Leiding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groep" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,
    "beschrijving" TEXT NOT NULL,

    CONSTRAINT "Groep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activiteit" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,
    "beschrijving" TEXT NOT NULL,
    "beginDatum" TIMESTAMP(3) NOT NULL,
    "eindDatum" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activiteit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nieuwsbericht" (
    "id" SERIAL NOT NULL,
    "titel" TEXT NOT NULL,
    "inhoud" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "auteurId" INTEGER NOT NULL,

    CONSTRAINT "Nieuwsbericht_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActiviteitToGroep" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Leiding_email_key" ON "Leiding"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ActiviteitToGroep_AB_unique" ON "_ActiviteitToGroep"("A", "B");

-- CreateIndex
CREATE INDEX "_ActiviteitToGroep_B_index" ON "_ActiviteitToGroep"("B");

-- AddForeignKey
ALTER TABLE "Leiding" ADD CONSTRAINT "Leiding_groepId_fkey" FOREIGN KEY ("groepId") REFERENCES "Groep"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nieuwsbericht" ADD CONSTRAINT "Nieuwsbericht_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "Leiding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActiviteitToGroep" ADD CONSTRAINT "_ActiviteitToGroep_A_fkey" FOREIGN KEY ("A") REFERENCES "Activiteit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActiviteitToGroep" ADD CONSTRAINT "_ActiviteitToGroep_B_fkey" FOREIGN KEY ("B") REFERENCES "Groep"("id") ON DELETE CASCADE ON UPDATE CASCADE;
