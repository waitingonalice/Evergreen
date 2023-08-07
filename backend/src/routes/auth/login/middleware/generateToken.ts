import jwt from "jsonwebtoken";

interface User {
  id: number;
  active: boolean;
  country: string;
  firstName: string;
  lastName: string;
}

export const generateToken = (user: User, rememberMe: boolean) => {
  const { id, country, firstName, lastName, active } = user;

  const auth =
    process.env.SESSION_SECRET &&
    jwt.sign(
      { data: { userId: id, country, firstName, lastName, verified: active } },
      process.env.SESSION_SECRET,
      { expiresIn: "15min" }
    );

  const refresh =
    process.env.SESSION_SECRET &&
    jwt.sign({ id, rememberMe }, process.env.SESSION_SECRET, {
      expiresIn: "365d",
    });

  return { auth, refresh };
};
