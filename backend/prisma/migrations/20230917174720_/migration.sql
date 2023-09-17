/*
  Warnings:

  - You are about to drop the column `transactionDataId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `TransactionSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `transactionDataId` on the `TransactionSchedule` table. All the data in the column will be lost.
  - You are about to drop the `TransactionData` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `TransactionSchedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `TransactionSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transactionDataId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionSchedule" DROP CONSTRAINT "TransactionSchedule_accountId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionSchedule" DROP CONSTRAINT "TransactionSchedule_transactionDataId_fkey";

-- DropIndex
DROP INDEX "Transaction_transactionDataId_key";

-- DropIndex
DROP INDEX "TransactionSchedule_transactionDataId_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionDataId",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "recurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TransactionSchedule" DROP COLUMN "accountId",
DROP COLUMN "transactionDataId",
ADD COLUMN     "transactionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TransactionData";

-- CreateIndex
CREATE UNIQUE INDEX "TransactionSchedule_transactionId_key" ON "TransactionSchedule"("transactionId");

-- AddForeignKey
ALTER TABLE "TransactionSchedule" ADD CONSTRAINT "TransactionSchedule_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
