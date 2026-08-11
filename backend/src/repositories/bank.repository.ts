import { prisma } from "../lib/prisma.js";

export const createBankAccount = async (
  userId: string,
  bankName: string,
  accountNumber: string,
  ifscCode: string,
) => {
  return prisma.bankAccount.create({
    data: {
      userId,
      bankName,
      accountNumber,
      ifscCode,
    },
  });
};

export const getBankAccountsByUserId = async (userId: string) => {
  return prisma.bankAccount.findMany({
    where: {
      userId,
    },
  });
};

export const findBankAccountById = async (id: string) => {
  return prisma.bankAccount.findUnique({
    where: {
      id,
    },
  });
};

export const deleteBankAccount = async (id: string) => {
  return prisma.bankAccount.delete({
    where: {
      id,
    },
  });
};
