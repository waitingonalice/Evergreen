/*
  Warnings:

  - You are about to drop the `Playground` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Playground" DROP CONSTRAINT "Playground_account_id_fkey";

-- DropTable
DROP TABLE "Playground";

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "account_id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "code" TEXT,
    "title" TEXT,
    "description" TEXT,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
