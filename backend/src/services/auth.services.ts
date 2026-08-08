import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repositories/user.repository.js";

export const signupService = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User Already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser(firstName, lastName, email, hashedPassword);

  return user;
};

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  const { password: _, ...safeUser } = user;

  return {
    token,
    user: safeUser,
  };
};

export const getCurrentUserService = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const { password: _, ...safeUser } = user;

  return safeUser;
};
