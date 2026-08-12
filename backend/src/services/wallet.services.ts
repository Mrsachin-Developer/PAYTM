import { AppError } from "../utils/AppError.js";
import {

  findWalletByUserId,
  incrementWalletBalance,
} from "../repositories/wallet.repository.js";
import { prisma } from "../lib/prisma.js";

export const getWalletService = async (userId: string) => {
  const wallet = await findWalletByUserId(userId);

  if (!wallet) {
    throw new AppError("Wallet not found", 404);
  }

  return wallet;
};

export const depositMoneyService = async (userId: string, amount: number) => {
  const wallet = await findWalletByUserId(userId);

  if (!wallet) {
    throw new AppError("Wallet not found", 404);
  }

  return incrementWalletBalance(userId, amount);
};

export const withdrawMoneyService = async (userId: string, amount: number) => {
  return prisma.$transaction(async (tx) => {
    const wallet = await tx.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new AppError("Wallet not found", 404);
    }

    if (Number(wallet.balance) < amount) {
      throw new AppError("Insufficient balance", 400);
    }

    return tx.wallet.update({
      where: { userId },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });
  });
};
