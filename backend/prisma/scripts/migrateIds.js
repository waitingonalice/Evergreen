import { v4 as uuid } from "uuid";
import { db } from "~/utils";

// TODO: add data migration to prod before release
const migrateIds = async () => {
  const users = await db.account.findMany();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    await db.account.update({
      where: { email: user.email },
      data: {
        id: uuid(),
      },
    });
  }
};

migrateIds();
