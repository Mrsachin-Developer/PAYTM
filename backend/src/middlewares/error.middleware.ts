import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

import { AppError } from "../utils/AppError.js";
import { redis } from "../lib/redis.js";


export const errorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idempotencyKey = req.header("Idempotency-Key");

  if (idempotencyKey) {
    await redis.set(
      `idempotency:${idempotencyKey}`,
      JSON.stringify({
        status: "FAILED",
        message: error.message,
      }),
      {
        EX: 300,
      },
    );
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
