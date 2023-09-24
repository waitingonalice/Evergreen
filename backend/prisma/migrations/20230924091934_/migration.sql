/*
  Warnings:

  - You are about to drop the column `currency` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `previousCurrency` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "currency",
DROP COLUMN "previousCurrency";

-- AlterTable
ALTER TABLE "BalanceHistory" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'SGD';

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "accountId" TEXT NOT NULL,
    "baseCurrency" "Currency" NOT NULL DEFAULT 'SGD',
    "profilePicture" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_accountId_key" ON "Profile"("accountId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
