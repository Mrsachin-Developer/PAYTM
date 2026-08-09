import { findWalletByUserId } from "../repositories/wallet.repository.js";

export const getWalletService = async (userId: string) => {
  const wallet = await findWalletByUserId(userId);

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  return wallet;
};
