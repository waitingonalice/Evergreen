/* eslint-disable no-await-in-loop */
import { prisma } from "../../src/db";

const migrateIds = async () => {
  const transactions = await prisma.transaction.findMany();
  for (let i = 0; i < transactions.length; i += 1) {
    const transaction = transactions[i];
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { account_id: transaction.account_id },
    });
  }
};

migrateIds();
