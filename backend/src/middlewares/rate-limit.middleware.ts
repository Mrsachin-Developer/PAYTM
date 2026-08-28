import { NextFunction, Request, Response } from "express";
import { redis } from "../lib/redis.js";
import { AppError } from "../utils/AppError.js";

const LIMIT = 5;
const WINDOW_SECONDS = 60;
export const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.userId;

  const key = `rate_limit:${userId}`;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, WINDOW_SECONDS);
  }

  if (count > LIMIT) {
    return next(new AppError("Rate limit exceeded. Try again later.", 429));
  }

  next();
};
