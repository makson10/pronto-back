-- CreateTable
CREATE TABLE "Post" (
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "picture" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("authorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_authorId_key" ON "Post"("authorId");
