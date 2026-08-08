import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { prisma } from "./lib/prisma.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    const users = await prisma.user.findMany();
    console.log("DB OK", users);
  } catch (error) {
    console.error("DB ERROR", error);
  }
});
