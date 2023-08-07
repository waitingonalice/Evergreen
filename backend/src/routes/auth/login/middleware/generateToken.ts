import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

interface User {
  email: string;
  country: string;
  firstName: string;
  lastName: string;
}

export const generateToken = (user: User) => {
  const { email, country, firstName, lastName } = user;
  const uniqueId = nanoid();
  console.log(uniqueId);
  const auth =
    process.env.SESSION_SECRET &&
    jwt.sign(
      { data: { email, country, firstName, lastName, id: uniqueId } },
      process.env.SESSION_SECRET,
      { expiresIn: 1000 * 60 * 15 } // 15 minutes
    );

  const refresh =
    process.env.SESSION_SECRET &&
    jwt.sign({ id: uniqueId, email }, process.env.SESSION_SECRET);

  return { auth, refresh };
};
