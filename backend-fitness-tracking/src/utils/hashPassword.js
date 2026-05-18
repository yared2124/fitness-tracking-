// src/utils/hashPassword.js - standalone password hashing/checking
import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (entered, hashed) => {
  return await bcrypt.compare(entered, hashed);
};
