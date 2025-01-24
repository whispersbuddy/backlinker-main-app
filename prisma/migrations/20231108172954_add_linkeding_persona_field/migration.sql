/*
  Warnings:

  - You are about to drop the column `image` on the `Persona` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Persona" DROP COLUMN "image",
ADD COLUMN     "linkedin" TEXT;
