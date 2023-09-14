import { v4 as uuid } from "uuid";
import { prisma } from "~/utils";

// TODO: add data migration to prod before release
const migrateIds = async () => {
  const users = await prisma.account.findMany();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    await prisma.account.update({
      where: { email: user.email },
      data: {
        id: uuid(),
      },
    });
  }
};

migrateIds();
