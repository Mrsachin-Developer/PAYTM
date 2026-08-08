import {
  loginController,
  logoutController,
  meController,
  signupController,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", authMiddleware, meController);
export default router;
