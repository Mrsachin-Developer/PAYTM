import { prisma } from "../lib/prisma.js";
type GetUserTransactionsParams = {
  userId: string;
  page: number;
  limit: number;
};

export const transactionRepository = {
  async getUserTransactions({
    userId,
    page,
    limit,
  }: GetUserTransactionsParams) {
    const skip = (page - 1) * limit;
    const whereClause = {
      OR: [{ senderId: userId }, { receiverId: userId }],
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
