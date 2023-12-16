import { prisma } from "../../src/db";

const deleteTransactions = async () => {
  await prisma.transaction.deleteMany({
    where: {
      account_id: "62b4b2ce-4b57-4dd7-97df-b6de0f64b47c",
    },
  });
};

deleteTransactions().then((res) => console.log(res));
