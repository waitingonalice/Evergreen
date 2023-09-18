/*
  Warnings:

  - You are about to drop the column `accountId` on the `TransactionSchedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TransactionSchedule" DROP CONSTRAINT "TransactionSchedule_accountId_fkey";

-- AlterTable
ALTER TABLE "TransactionSchedule" DROP COLUMN "accountId";
