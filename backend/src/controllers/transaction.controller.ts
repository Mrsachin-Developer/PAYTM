import { NextFunction, Request, Response } from "express";
import { getTransactionHistoryService } from "../services/transaction.service.js";

export const getTransactionHistoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const transactions = await getTransactionHistoryService(req.userId!);

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};