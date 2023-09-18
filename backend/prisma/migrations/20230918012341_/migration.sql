/*
  Warnings:

  - You are about to drop the column `transactionId` on the `TransactionSchedule` table. All the data in the column will be lost.
  - Added the required column `transactionScheduleId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionSchedule" DROP CONSTRAINT "TransactionSchedule_transactionId_fkey";

-- DropIndex
DROP INDEX "TransactionSchedule_transactionId_key";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transactionScheduleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TransactionSchedule" DROP COLUMN "transactionId";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionScheduleId_fkey" FOREIGN KEY ("transactionScheduleId") REFERENCES "TransactionSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
