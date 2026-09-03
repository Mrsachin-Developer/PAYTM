import { NextFunction, Request, Response } from "express";
import { redis } from "../lib/redis.js";
import { AppError } from "../utils/AppError.js";

export const backpressureMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const MAX_ACTIVE_TRANSFERS =
    Number(process.env.MAX_ACTIVE_TRANSFERS) || 100;

  const ACTIVE_TRANSFERS_KEY = "active_transfers";

  const count = await redis.incr(ACTIVE_TRANSFERS_KEY);

  if (count > MAX_ACTIVE_TRANSFERS) {
    await redis.decr(ACTIVE_TRANSFERS_KEY);

    return next(
      new AppError(
        "System is busy. Please try again later.",
        503
      )
    );
  }

  res.on("finish", () => {
    redis.decr(ACTIVE_TRANSFERS_KEY).catch(console.error);
  });

  next();
};