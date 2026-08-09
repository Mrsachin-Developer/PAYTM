// wallet.controller.ts

import { Request, Response } from "express";
import { getWalletService } from "../services/wallet.services.js";

export const getWalletController = async (
  req: Request,
  res: Response
) => {
  const wallet = await getWalletService(req.userId!);

  res.status(200).json({
    success: true,
    wallet,
  });
};