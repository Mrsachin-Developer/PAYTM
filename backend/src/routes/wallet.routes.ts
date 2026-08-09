import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getWalletController } from "../controllers/wallet.controller.js";

const router = Router();
router.get("/", authMiddleware, getWalletController);

export default router;
