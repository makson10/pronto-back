-- CreateTable
CREATE TABLE "VerificatingRequest" (
    "userId" INTEGER NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificatingRequest_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificatingRequest_userId_key" ON "VerificatingRequest"("userId");

-- AddForeignKey
ALTER TABLE "VerificatingRequest" ADD CONSTRAINT "VerificatingRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
