/* eslint-disable no-await-in-loop */
import { prisma } from "../../src/db";

const seedTransaction = async () => {
  for (let i = 0; i < 10000; i += 1) {
    await prisma.transaction.create({
      data: {
        title: `test title ${i}`,
        description: `test description ${i}`,
        amount: 100,
        category: "HOUSING",
        type: "INCOME",
        account_id: "f166b623-974d-4c24-b029-bf2763cf3fdf",
      },
    });
  }
};

seedTransaction();
