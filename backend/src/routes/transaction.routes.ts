import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getTransactionHistoryController } from "../controllers/transaction.controller.js";

const router = Router();

router.get("/history", authMiddleware, getTransactionHistoryController);

export default router;
