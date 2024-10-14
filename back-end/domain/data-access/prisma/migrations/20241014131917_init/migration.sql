-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "age" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "complaints" TEXT[],
    "nationalRegister" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
