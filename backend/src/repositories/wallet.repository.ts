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
