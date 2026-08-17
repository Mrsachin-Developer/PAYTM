import { transactionRepository } from "../repositories/transaction.repository.js";

export const getTransactionHistoryService = async (userId: string) => {
  return transactionRepository.getUserTransactions(userId);
};
