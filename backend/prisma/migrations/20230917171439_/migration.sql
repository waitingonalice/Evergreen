/*
  Warnings:

  - You are about to drop the column `balanceId` on the `BalanceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `balanceId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recurring` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TransactionSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `TransactionSchedule` table. All the data in the column will be lost.
  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[transactionDataId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionDataId]` on the table `TransactionSchedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `BalanceHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionDataId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `TransactionSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionDataId` to the `TransactionSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_accountId_fkey";

-- DropForeignKey
ALTER TABLE "BalanceHistory" DROP CONSTRAINT "BalanceHistory_balanceId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_balanceId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionSchedule" DROP CONSTRAINT "TransactionSchedule_transactionId_fkey";

-- DropIndex
DROP INDEX "TransactionSchedule_transactionId_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'USD',
ADD COLUMN     "previousCurrency" "Currency";

-- AlterTable
ALTER TABLE "BalanceHistory" DROP COLUMN "balanceId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount",
DROP COLUMN "balanceId",
DROP COLUMN "createdAt",
DROP COLUMN "recurring",
DROP COLUMN "updatedAt",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "transactionDataId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TransactionSchedule" DROP COLUMN "createdAt",
DROP COLUMN "transactionId",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "transactionDataId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Balance";

-- CreateTable
CREATE TABLE "TransactionData" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(65,30) NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionDataId_key" ON "Transaction"("transactionDataId");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionSchedule_transactionDataId_key" ON "TransactionSchedule"("transactionDataId");

-- AddForeignKey
ALTER TABLE "BalanceHistory" ADD CONSTRAINT "BalanceHistory_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionDataId_fkey" FOREIGN KEY ("transactionDataId") REFERENCES "TransactionData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionSchedule" ADD CONSTRAINT "TransactionSchedule_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionSchedule" ADD CONSTRAINT "TransactionSchedule_transactionDataId_fkey" FOREIGN KEY ("transactionDataId") REFERENCES "TransactionData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
