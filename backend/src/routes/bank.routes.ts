import { Router } from "express";
import {
  createBankAccountController,
  deleteBankAccountController,
  getBankAccountsController,
} from "../controllers/bank.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createBankAccountController);

router.get("/", authMiddleware, getBankAccountsController);

router.delete("/:id", authMiddleware, deleteBankAccountController);

export default router;
