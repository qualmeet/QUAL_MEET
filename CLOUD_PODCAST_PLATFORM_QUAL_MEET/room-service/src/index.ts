import "dotenv/config";
import { createApp } from "./app";

const PORT=process.env.PORT || 4002;

const app=createApp();

app.listen(PORT,()=>{
    console.log(`Room service running on port ${PORT}`)
})