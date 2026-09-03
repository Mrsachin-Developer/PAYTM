import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  depositMoneyController,
  getWalletController,
  withdrawMoneyController,
  sendMoneyController,
} from "../controllers/wallet.controller.js";
import { idempotencyMiddleware } from "../middlewares/idempotency.middleware.js";
import { rateLimitMiddleware } from "../middlewares/rate-limit.middleware.js";
import { backpressureMiddleware } from "../middlewares/backpressure.middleware.js";
const router = Router();

router.use(authMiddleware);

router.get("/", getWalletController);

router.post("/deposit", depositMoneyController);

router.post("/withdraw", withdrawMoneyController);
router.post(
  "/send",
  rateLimitMiddleware,
  backpressureMiddleware,
  idempotencyMiddleware,
  sendMoneyController,
);
export default router;
