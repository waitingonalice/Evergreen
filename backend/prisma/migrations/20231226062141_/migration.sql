/*
  Warnings:

  - You are about to drop the column `base_currency` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `BalanceHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionSchedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BalanceHistory" DROP CONSTRAINT "BalanceHistory_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transaction_schedule_id_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "base_currency",
DROP COLUMN "profile_picture";

-- DropTable
DROP TABLE "BalanceHistory";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "TransactionSchedule";

-- DropEnum
DROP TYPE "Currency";

-- DropEnum
DROP TYPE "TransactionType";

-- CreateTable
CREATE TABLE "Playground" (
    "id" SERIAL NOT NULL,
    "account_id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "code" TEXT,

    CONSTRAINT "Playground_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Playground_account_id_key" ON "Playground"("account_id");

-- AddForeignKey
ALTER TABLE "Playground" ADD CONSTRAINT "Playground_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
