"use server";
import { generateToken } from "./utils/auth";

export const login = async (password: string) => {
  if (password === process.env.ADMIN_PASSWORD) {
    await generateToken(123);
    return true;
  }
  return false;
};
