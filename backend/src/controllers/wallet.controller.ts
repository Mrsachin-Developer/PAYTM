// wallet.controller.ts

import { NextFunction, Request, Response } from "express";
import { amountSchema } from "../validators/wallet.validator.js";
import {
  depositMoneyService,
  getWalletService,
  sendMoneyService,
  withdrawMoneyService,
} from "../services/wallet.services.js";
import { sendMoneySchema } from "../validators/transaction.validator.js";

export const getWalletController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const wallet = await getWalletService(req.userId!);

    res.status(200).json({
      success: true,
      wallet,
    });
  } catch (error) {
    next(error);
  }
};

export const depositMoneyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validateData = amountSchema.parse(req.body);

    const wallet = await depositMoneyService(req.userId!, validateData.amount);

    res.status(200).json({
      success: true,
      message: "Money deposited successfully",
      wallet,
    });
  } catch (error) {
    next(error);
  }
};

export const withdrawMoneyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validateData = amountSchema.parse(req.body);

    const wallet = await withdrawMoneyService(req.userId!, validateData.amount);

    res.status(200).json({
      success: true,
      message: "Money withdrawn successfully",
      wallet,
    });
  } catch (error) {
    next(error);
  }
};

export const sendMoneyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = sendMoneySchema.parse(req.body);

    const transaction = await sendMoneyService(
      req.userId!,
      validatedData.phone,
      validatedData.amount,
    );

    res.status(200).json({
      success: true,
      message: "Money transferred successfully",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};
