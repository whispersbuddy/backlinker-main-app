/*
  Warnings:

  - You are about to drop the column `pitchId` on the `pitches` table. All the data in the column will be lost.
  - Added the required column `query` to the `pitches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `queryRequirements` to the `pitches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pitches" DROP COLUMN "pitchId",
ADD COLUMN     "connectivelyPitchId" TEXT,
ADD COLUMN     "query" TEXT NOT NULL,
ADD COLUMN     "queryRequirements" TEXT NOT NULL;
