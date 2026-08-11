import { Request, Response, NextFunction } from "express";

import { createBankAccountSchema } from "../validators/bank.validator.js";
import {
  createBankAccountService,
  deleteBankAccountService,
  getBankAccountsService,
} from "../services/bank.services.js";

export const createBankAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createBankAccountSchema.parse(req.body);

    const bankAccount = await createBankAccountService(
      req.userId!,
      validatedData.bankName,
      validatedData.accountNumber,
      validatedData.ifscCode,
    );

    res.status(201).json({
      success: true,
      bankAccount,
    });
  } catch (error) {
    next(error);
  }
};

export const getBankAccountsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bankAccounts = await getBankAccountsService(req.userId!);

    res.status(200).json({
      success: true,
      bankAccounts,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBankAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bankAccountId = req.params.id as string;

    if (!bankAccountId) {
      throw new Error("Bank account ID is required");
    }

    await deleteBankAccountService(req.userId!, bankAccountId);

    res.status(200).json({
      success: true,
      message: "Bank account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
