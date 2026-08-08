import { prisma } from "../lib/prisma.js";

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  return prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
};
export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};
