/*
  Warnings:

  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_profileId_name_fkey";

-- DropTable
DROP TABLE "UserProfile";

-- CreateTable
CREATE TABLE "Profile" (
    "profileId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "dateOfBirth" TIMESTAMP(3),
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city" TEXT,
    "isVerifed" BOOLEAN NOT NULL DEFAULT false,
    "sentVerificationRequest" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_profileId_name_key" ON "Profile"("profileId", "name");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_profileId_name_fkey" FOREIGN KEY ("profileId", "name") REFERENCES "User"("id", "fullName") ON DELETE RESTRICT ON UPDATE CASCADE;
