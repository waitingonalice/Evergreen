/*
  Warnings:

  - You are about to drop the column `token` on the `Account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Account_token_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "token";
