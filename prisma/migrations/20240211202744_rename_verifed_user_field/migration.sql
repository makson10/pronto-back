/*
  Warnings:

  - You are about to drop the column `verifedUser` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "verifedUser",
ADD COLUMN     "isVerifed" BOOLEAN NOT NULL DEFAULT false;
