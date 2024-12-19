/*
  Warnings:

  - You are about to drop the column `accountId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `destinationAccountNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceAccountNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/ -- DropForeignKey

ALTER TABLE "Transaction"
DROP CONSTRAINT "Transaction_accountId_fkey";

-- AlterTable

ALTER TABLE "Transaction"
DROP COLUMN "accountId",
DROP COLUMN "destination",
DROP COLUMN "source",
            ADD COLUMN "destinationAccountNumber" TEXT, ADD COLUMN "sourceAccountNumber" TEXT;

-- Create default accounts

INSERT INTO "Account" ("accountNumber",
                       "balance",
                       "isShared",
                       "startDate",
                       "status",
                       "type")
VALUES ('default_destination_account_number',
        0,
        false,
        NOW(),
        'active',
        'default'), ('default_source_account_number',
                     0,
                     false,
                     NOW(),
                     'active',
                     'default');

-- Update the existing rows with default values or appropriate values

UPDATE "Transaction"
SET "destinationAccountNumber" = 'default_destination_account_number'
WHERE "destinationAccountNumber" IS NULL;


UPDATE "Transaction"
SET "sourceAccountNumber" = 'default_source_account_number'
WHERE "sourceAccountNumber" IS NULL;

-- Make the new columns required

ALTER TABLE "Transaction"
ALTER COLUMN "destinationAccountNumber"
SET NOT NULL;


ALTER TABLE "Transaction"
ALTER COLUMN "sourceAccountNumber"
SET NOT NULL;

-- AddForeignKey

ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_destinationAccountNumber_fkey"
FOREIGN KEY ("destinationAccountNumber") REFERENCES "Account"("accountNumber") ON
DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sourceAccountNumber_fkey"
FOREIGN KEY ("sourceAccountNumber") REFERENCES "Account"("accountNumber") ON
DELETE RESTRICT ON
UPDATE CASCADE;

