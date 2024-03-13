/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_profileId_name_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "VerificationRequest" DROP CONSTRAINT "VerificationRequest_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationRequest";

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id","fullName")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "sessionId" TEXT NOT NULL,
    "userId" SERIAL NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("sessionId")
);

-- CreateTable
CREATE TABLE "Profiles" (
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

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "VerificationRequests" (
    "userId" INTEGER NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationRequests_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Posts" (
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "picture" TEXT,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("authorId","createdAt")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_sessionId_key" ON "Sessions"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_userId_key" ON "Sessions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_profileId_name_key" ON "Profiles"("profileId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequests_userId_key" ON "VerificationRequests"("userId");

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_profileId_name_fkey" FOREIGN KEY ("profileId", "name") REFERENCES "Users"("id", "fullName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationRequests" ADD CONSTRAINT "VerificationRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
