import { prisma } from "../lib/prisma.js";

export const createWallet = async (userId: string) => {
  return prisma.wallet.create({
    data: {
      userId,
    },
  });
};

export const findWalletByUserId = async (userId: string) => {
  return prisma.wallet.findUnique({
    where: {
      userId,
    },
  });
};

export const incrementWalletBalance = async (
  userId: string,
  amount: number,
) => {
  return prisma.wallet.update({
    where: {
      userId,
    },
    data: {
      balance: {
        increment: amount,
      },
    },
  });
};

export const decrementWalletBalance = async (
  userId: string,
  amount: number,
) => {
  return prisma.wallet.update({
    where: {
      userId,
    },
    data: {
      balance: {
        decrement: amount,
      },
    },
  });
};

export const deductBalanceIfSufficient = async (
  db: any,
  userId: string,
  amount: number,
) => {
  return db.wallet.updateMany({
    where: {
      userId,
      balance: {
        gte: amount,
      },
    },
    data: {
      balance: {
        decrement: amount,
      },
    },
  });
};

export const findUserByPhone = async (phone: string) => {
  return prisma.user.findUnique({
    where: {
      phone,
    },
  });
};
