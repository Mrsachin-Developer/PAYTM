import express from "express";
import authRoutes from "./routes/auth.routes.js";
import walletRoutes from "./routes/wallet.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use(errorHandler);

export default app;
