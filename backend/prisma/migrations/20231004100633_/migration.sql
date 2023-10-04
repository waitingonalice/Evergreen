/*
  Warnings:

  - You are about to alter the column `description` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(800)`.
  - You are about to alter the column `title` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "description" SET DATA TYPE VARCHAR(800),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(300);
