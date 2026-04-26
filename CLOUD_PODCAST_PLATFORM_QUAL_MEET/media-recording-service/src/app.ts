import express from "express";
import recordingRoutes from "./routes/recording.routes";


export function createApp(){
    const app=express();

    app.use(express.json());


    app.get("/health",async(req,res)=>{
        res.status(200).json({
            service:"media-recording-service",
            "status":"ok",
        });
    });

    app.use("/",recordingRoutes);

    return app;
}