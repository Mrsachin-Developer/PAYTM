import express from "express";
import connectDB from "./src/db/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;

connectDB();
app.listen((port) => {
  console.log(`Server is running at port: ${port}🚀`);
});
