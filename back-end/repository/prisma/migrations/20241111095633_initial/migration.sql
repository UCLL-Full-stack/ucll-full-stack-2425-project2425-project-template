-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,
    "voornaam" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "wachtwoord" TEXT NOT NULL,
    "adres" TEXT NOT NULL,
    "gebruikersnaam" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "aantal" INTEGER NOT NULL,
    "prijs" DOUBLE PRECISION NOT NULL,
    "pokebowlId" INTEGER,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokebowl" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "beschrijving" TEXT NOT NULL,
    "prijs" DOUBLE PRECISION NOT NULL,
    "maxAantalIngredienten" INTEGER NOT NULL,
    "bestellingId" INTEGER,

    CONSTRAINT "Pokebowl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bestelling" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bestelling_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_naam_key" ON "Ingredient"("naam");

-- CreateIndex
CREATE UNIQUE INDEX "Pokebowl_naam_key" ON "Pokebowl"("naam");

-- CreateIndex
CREATE UNIQUE INDEX "Bestelling_userId_key" ON "Bestelling"("userId");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_pokebowlId_fkey" FOREIGN KEY ("pokebowlId") REFERENCES "Pokebowl"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokebowl" ADD CONSTRAINT "Pokebowl_bestellingId_fkey" FOREIGN KEY ("bestellingId") REFERENCES "Bestelling"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bestelling" ADD CONSTRAINT "Bestelling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
