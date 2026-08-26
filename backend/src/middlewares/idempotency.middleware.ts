import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError.js";
import { redis } from "../lib/redis.js";

export const idempotencyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idempotencyKey = req.header("Idempotency-Key");

  if (!idempotencyKey) {
    return next(new AppError("Idempotency-Key header is required", 400));
  }

  //lockAcquired === "OK"
  const lockAcquired = await redis.set(
    `idempotency:${idempotencyKey}`,
    JSON.stringify({
      status: "PROCESSING",
    }),
    {
      NX: true,
      EX: 300,
    },
  );

  //lockAcquired === null
  if (!lockAcquired) {
    const cachedResponse = await redis.get(`idempotency:${idempotencyKey}`);

    const cachedData = cachedResponse ? JSON.parse(cachedResponse) : null;

    if (cachedData?.status === "PROCESSING") {
      return next(new AppError("Request already in progress", 409));
    }

    if (cachedData?.status === "SUCCESS") {
      return res.status(200).json(cachedData.response);
    }

    if (cachedData?.status === "FAILED") {
      return next(
        new AppError(cachedData.message || "Previous request failed", 400),
      );
    }
  }

  //   if (cachedData?.status === "PROCESSING") {
  //     return next(new AppError("Request already in progress", 409));
  //   }

  //   if (cachedData?.status === "SUCCESS") {
  //     return res.status(200).json(cachedData.response);
  //   }
  //   await redis.set(
  //     `idempotency:${idempotencyKey}`,
  //     JSON.stringify({
  //       status: "PROCESSING",
  //     }),
  //     {
  //       EX: 300,
  //     },
  //   );
  const originalJson = res.json.bind(res);

  res.json = ((body: any) => {
    redis
      .set(
        `idempotency:${idempotencyKey}`,
        JSON.stringify({
          status: "SUCCESS",
          response: body,
        }),
        {
          EX: 300,
        },
      )
      .catch(console.error);

    return originalJson(body);
  }) as typeof res.json;
  next();
};
