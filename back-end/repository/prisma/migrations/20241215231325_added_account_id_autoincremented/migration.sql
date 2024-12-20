-- AlterTable
CREATE SEQUENCE user_accountid_seq;
ALTER TABLE "User" ALTER COLUMN "accountId" SET DEFAULT nextval('user_accountid_seq');
ALTER SEQUENCE user_accountid_seq OWNED BY "User"."accountId";
