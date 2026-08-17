import { prisma } from "../lib/prisma.js";

export const transactionRepository = {
  async getUserTransactions(userId: string) {
    return prisma.transaction.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },

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
    });
  },
};
