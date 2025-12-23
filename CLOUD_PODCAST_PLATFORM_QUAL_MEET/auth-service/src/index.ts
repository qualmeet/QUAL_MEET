import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { prisma } from "./db/prisma";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.get("/health", async (_req, res) => {
  await prisma.user.findMany();
  res.json({ status: "auth-service running", db: "connected" });
});

app.listen(PORT, () => {
  console.log(`🔐 Auth service running on port ${PORT}`);
});
