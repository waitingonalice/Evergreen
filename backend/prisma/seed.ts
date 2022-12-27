import { db } from "../src/utils";

type Account = {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
};

const accounts: Account[] = [
  {
    email: "test@bar.com",
    password: "test",
    firstName: "wilson",
    lastName: "sie",
  },
  {
    email: "test1@bar.com",
    password: "test",
    firstName: "wilson",
    lastName: "sie",
  },
  {
    email: "test2@bar.com",
    password: "test",
    firstName: "wilson",
    lastName: "sie",
  },
];

const seed = async () => {
  const createAccount = await db.account.createMany({ data: accounts });
  console.log(createAccount);
};

seed();
