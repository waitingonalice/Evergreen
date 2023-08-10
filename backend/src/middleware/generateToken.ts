import jwt from "jsonwebtoken";

interface User {
  id: string;
  country: string;
  firstName: string;
  lastName: string;
  active: boolean;
  email: string;
}

export const generateAuthToken = (user: User, secret: string) => {
  const { id: userId, country, firstName, lastName, active, email } = user;
  const auth = jwt.sign(
    {
      data: {
        userId,
        country,
        firstName,
        lastName,
        verified: active,
        email,
      },
    },
    secret,
    { expiresIn: "15min" }
  );
  return auth;
};

export const generateRefreshToken = (
  user: User,
  rememberMe: boolean,
  secret: string
) => {
  const { id } = user;
  const refresh = jwt.sign(
    {
      data: {
        id,
        rememberMe,
      },
    },
    secret
  );

  return refresh;
};
