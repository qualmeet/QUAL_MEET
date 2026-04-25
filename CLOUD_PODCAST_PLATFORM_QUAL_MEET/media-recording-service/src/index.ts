import "dotenv/config";
import {createApp} from "./app";
import  "./worker/recording.worker";

const PORT=process.env.PORT || 4005;

const app=createApp();

app.listen(PORT,()=>{
    console.log(`Media Recording service running on port ${PORT}`)
});


