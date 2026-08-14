import { prisma } from "../lib/prisma.js";

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const createUserWithWallet = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string,
) => {
  return prisma.$transaction(
    async (tx) => {
      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          password,
        },
      });

      await tx.wallet.create({
        data: {
          userId: user.id,
        },
      });

      return user;
    },
    {
      timeout: 15000,
    },
  );
};

export const findUserByPhone = async (phone: string) => {
  return prisma.user.findUnique({
    where: {
      phone,
    },
  });
};
