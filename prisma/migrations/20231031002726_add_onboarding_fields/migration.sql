-- AlterTable
ALTER TABLE "users" ADD COLUMN     "incompleteInformation" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "newSignup" BOOLEAN NOT NULL DEFAULT true;
