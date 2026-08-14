import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  depositMoneyController,
  getWalletController,
  withdrawMoneyController,
  sendMoneyController,
} from "../controllers/wallet.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getWalletController);

router.post("/deposit", depositMoneyController);

router.post("/withdraw", withdrawMoneyController);
router.post("/send", sendMoneyController);
export default router;
