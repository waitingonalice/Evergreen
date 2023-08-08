import jwt from "jsonwebtoken";

interface User {
  id: string;
  email: string;
  active: boolean;
  country: string;
  firstName: string;
  lastName: string;
}

export const generateToken = (user: User, rememberMe: boolean) => {
  const { id, country, firstName, lastName, active, email } = user;

  const auth =
    process.env.SESSION_SECRET &&
    jwt.sign(
      {
        data: {
          userId: id,
          country,
          firstName,
          lastName,
          verified: active,
          email,
        },
      },
      process.env.SESSION_SECRET,
      { expiresIn: "15min" }
    );

  const refresh =
    process.env.SESSION_SECRET &&
    jwt.sign({ id, rememberMe }, process.env.SESSION_SECRET);

  return { auth, refresh };
};
