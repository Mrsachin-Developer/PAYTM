import {
  createBankAccount,
  deleteBankAccount,
  findBankAccountById,
  getBankAccountsByUserId,
} from "../repositories/bank.repository.js";
import { AppError } from "../utils/AppError.js";

export const createBankAccountService = async (
  userId: string,
  bankName: string,
  accountNumber: string,
  ifscCode: string,
) => {
  return createBankAccount(userId, bankName, accountNumber, ifscCode);
};

export const getBankAccountsService = async (userId: string) => {
  return getBankAccountsByUserId(userId);
};

export const deleteBankAccountService = async (
  userId: string,
  bankAccountId: string,
) => {
  const bankAccount = await findBankAccountById(bankAccountId);
  if (!bankAccount) {
    throw new AppError("Bank account not found", 404);
  }

  if (bankAccount.userId !== userId) {
    throw new AppError("Unauthorized access", 403);
  }

  return deleteBankAccount(bankAccountId);
};
