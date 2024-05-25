/*
  Warnings:

  - Added the required column `requesterAddress` to the `request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterAge` to the `request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterDivision` to the `request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterEmail` to the `request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterLastDonationDate` to the `request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterLocation` to the `request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterName` to the `request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterPhoneNumber` to the `request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "request" ADD COLUMN     "requesterAddress" TEXT NOT NULL,
ADD COLUMN     "requesterAge" INTEGER NOT NULL,
ADD COLUMN     "requesterDivision" TEXT NOT NULL,
ADD COLUMN     "requesterEmail" TEXT NOT NULL,
ADD COLUMN     "requesterLastDonationDate" TEXT NOT NULL,
ADD COLUMN     "requesterLocation" TEXT NOT NULL,
ADD COLUMN     "requesterName" TEXT NOT NULL,
ADD COLUMN     "requesterPhoneNumber" TEXT NOT NULL;
