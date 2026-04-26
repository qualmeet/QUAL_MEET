import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.status(200).json({
    service: "auth-service",
    status: "ok",
  });
});


//auth routes
app.use("/",authRoutes);

export default app;
