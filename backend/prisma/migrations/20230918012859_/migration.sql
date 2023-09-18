/*
  Warnings:

  - Added the required column `accountId` to the `TransactionSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transactionScheduleId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "transactionScheduleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TransactionSchedule" ADD COLUMN     "accountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionScheduleId_fkey" FOREIGN KEY ("transactionScheduleId") REFERENCES "TransactionSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionSchedule" ADD CONSTRAINT "TransactionSchedule_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
