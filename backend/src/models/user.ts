/* eslint-disable class-methods-use-this */
import { prisma } from "~/db";

export class User {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async getUser() {
    const userData = await prisma.account.findUnique({
      where: {
        id: this.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        country: true,
        email: true,
        active: true,
      },
    });
    return userData;
  }
}

export default User;
