-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ageGroup" TEXT,
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "goal" TEXT,
ADD COLUMN     "preferredLanguage" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "profileCompleted" BOOLEAN NOT NULL DEFAULT false;
