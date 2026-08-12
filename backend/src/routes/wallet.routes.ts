import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  depositMoneyController,
  getWalletController,
  withdrawMoneyController,
} from "../controllers/wallet.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getWalletController);

router.post("/deposit", depositMoneyController);

router.post("/withdraw", withdrawMoneyController);

export default router;
