import { transactionRepository } from "../repositories/transaction.repository.js";

type GetTransactionHistoryParams = {
  userId: string;
  page: number;
  limit: number;
  type?: "DEPOSIT" | "WITHDRAW" | "TRANSFER";
};
export const getTransactionHistoryService = async ({
  userId,
  page,
  limit,
  type,
}: GetTransactionHistoryParams) => {
  const { transactions, total } =
    await transactionRepository.getUserTransactions({
      userId,
      page,
      limit,
      ...(type && { type }),
    });

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
