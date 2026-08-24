import { NextFunction, Request, Response } from "express";
import { getTransactionHistoryService } from "../services/transaction.service.js";
import { transactionHistoryQuerySchema } from "../validators/transaction.validator.js";

export const getTransactionHistoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, type } = transactionHistoryQuerySchema.parse(
      req.query,
    );

    const result = await getTransactionHistoryService({
      userId: req.userId!,
      page,
      limit,
      ...(type && { type }),
    });
    res.status(200).json({
      success: true,
      transactions: result.transactions,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
