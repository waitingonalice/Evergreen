/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_token_key" ON "Account"("token");
