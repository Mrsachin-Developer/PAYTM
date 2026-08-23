import { transactionRepository } from "../repositories/transaction.repository.js";

type GetTransactionHistoryParams = {
  userId: string;
  page: number;
  limit: number;
};

export const getTransactionHistoryService = async ({
  userId,
  page,
  limit,
}: GetTransactionHistoryParams) => {
  const { transactions, total } =
    await transactionRepository.getUserTransactions({ userId, page, limit });

  const totalPages = Math.ceil(total / limit);

  return {
    transactions,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};
