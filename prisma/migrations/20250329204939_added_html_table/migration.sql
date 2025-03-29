-- CreateTable
CREATE TABLE "htmlFile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "file" TEXT,

    CONSTRAINT "htmlFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "htmlFile" ADD CONSTRAINT "htmlFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
