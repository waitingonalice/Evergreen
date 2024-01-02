import jwt from "jsonwebtoken";

export const jwtDecode = <T>(token: string) =>
  jwt.verify(token, process.env.SESSION_SECRET || "") as T;
