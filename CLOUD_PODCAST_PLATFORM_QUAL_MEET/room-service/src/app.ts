import express from "express";
import roomRoutes from "./routes/room.routes";

export function createApp(){
    const app=express();

    app.use(express.json());

    app.get("/health", (_req, res) => {
        res.status(200).json({
            service: "room-service",
            status: "ok",
        });
    });

    app.use("/rooms",roomRoutes);

    return app;

}