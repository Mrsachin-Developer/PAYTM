import { AppError } from "../utils/AppError.js";
import {
  deductBalanceIfSufficient,
  findWalletByUserId,
} from "../repositories/wallet.repository.js";
import { prisma } from "../lib/prisma.js";
import { findUserByPhone } from "../repositories/user.repository.js";

export const getWalletService = async (userId: string) => {
  const wallet = await findWalletByUserId(userId);

  if (!wallet) {
    throw new AppError("Wallet not found", 404);
  }

  return wallet;
};

export const depositMoneyService = async (userId: string, amount: number) => {
  return prisma.$transaction(async (tx) => {
    const wallet = await tx.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new AppError("Wallet not found", 404);
    }

    const updatedWallet = await tx.wallet.update({
      where: { userId },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    await tx.transaction.create({
      data: {
        type: "DEPOSIT",
        amount,
        receiverId: userId,
        status: "SUCCESS",
      },
    });

    return updatedWallet;
  });
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
    const updatedWallet = await tx.wallet.update({
      where: { userId },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    await tx.transaction.create({
      data: {
        type: "WITHDRAW",
        amount,
        senderId: userId,
        status: "SUCCESS",
      },
    });

    return updatedWallet;
  });
};

export const sendMoneyService = async (
  senderUserId: string,
  receiverPhone: string,
  amount: number,
) => {
  const receiver = await findUserByPhone(receiverPhone);

  if (!receiver) {
    throw new AppError("Receiver not found", 404);
  }

  if (receiver.id === senderUserId) {
    throw new AppError("Cannot send money to yourself", 400);
  }

  return prisma.$transaction(async (tx) => {
    const senderWallet = await tx.wallet.findUnique({
      where: {
        userId: senderUserId,
      },
    });

    if (!senderWallet) {
      throw new AppError("Sender wallet not found", 404);
    }
    const receiverWallet = await tx.wallet.findUnique({
      where: {
        userId: receiver.id,
      },
    });

    if (!receiverWallet) {
      throw new AppError("Receiver wallet not found", 404);
    }

    const result = await deductBalanceIfSufficient(tx, senderUserId, amount);

    if (result.count === 0) {
      throw new AppError("Insufficient balance", 400);
    }

    await tx.wallet.update({
      where: {
        userId: receiver.id,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    const transaction = await tx.transaction.create({
      data: {
        type: "TRANSFER",
        amount,
        senderId: senderUserId,
        receiverId: receiver.id,
        status: "SUCCESS",
      },
    });

    return transaction;
  });
};
