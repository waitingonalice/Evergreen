-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('SGD', 'USD');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "account_id" TEXT NOT NULL,
    "base_currency" "Currency" NOT NULL DEFAULT 'SGD',
    "profile_picture" TEXT,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalanceHistory" (
    "id" SERIAL NOT NULL,
    "total" DECIMAL(19,4) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_id" TEXT NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'SGD',
    "total_expense" DECIMAL(19,4) NOT NULL DEFAULT 0,
    "total_income" DECIMAL(19,4) NOT NULL DEFAULT 0,

    CONSTRAINT "BalanceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "account_id" TEXT NOT NULL,
    "amount" DECIMAL(19,4) NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(800),
    "title" VARCHAR(300) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "transaction_schedule_id" INTEGER,
    "type" "TransactionType" NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionSchedule" (
    "id" SERIAL NOT NULL,
    "frequency" TEXT NOT NULL,
    "next_run" INTEGER NOT NULL,

    CONSTRAINT "TransactionSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_account_id_key" ON "Profile"("account_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceHistory" ADD CONSTRAINT "BalanceHistory_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transaction_schedule_id_fkey" FOREIGN KEY ("transaction_schedule_id") REFERENCES "TransactionSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
