import { prisma } from "../lib/prisma.js";
type GetTransactionHistoryParams = {
  userId: string;
  page: number;
  limit: number;
  type?: "DEPOSIT" | "WITHDRAW" | "TRANSFER";
};

export const transactionRepository = {
  async getUserTransactions({
    userId,
    page,
    limit,
    type,
  }: GetTransactionHistoryParams) {
    const skip = (page - 1) * limit;
    const whereClause = {
      OR: [{ senderId: userId }, { receiverId: userId }],

      ...(type && { type }),
    };
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: whereClause,

        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phone: true,
            },
          },

          receiver: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phone: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.transaction.count({
        where: whereClause,
      }),
    ]);

    return {
      transactions,
      total,
    };
  },
};
