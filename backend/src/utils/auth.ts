import bcrypt from "bcrypt";

export const passwordHash = async (password: string) =>
  bcrypt.hash(password, 10);
