import jwt from "jsonwebtoken";
import { Env } from "./env";

export const jwtDecode = <T>(token: string) =>
  jwt.verify(token, Env.SESSION_SECRET) as T;
