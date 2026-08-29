-- AlterTable
ALTER TABLE "User" ADD COLUMN     "houseLevel" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "CompanionMemory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "importance" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanionMemory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CompanionMemory_userId_idx" ON "CompanionMemory"("userId");

-- CreateIndex
CREATE INDEX "CompanionMemory_type_idx" ON "CompanionMemory"("type");

-- CreateIndex
CREATE INDEX "CompanionMemory_importance_idx" ON "CompanionMemory"("importance");

-- CreateIndex
CREATE INDEX "CompanionMemory_createdAt_idx" ON "CompanionMemory"("createdAt");

-- AddForeignKey
ALTER TABLE "CompanionMemory" ADD CONSTRAINT "CompanionMemory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
