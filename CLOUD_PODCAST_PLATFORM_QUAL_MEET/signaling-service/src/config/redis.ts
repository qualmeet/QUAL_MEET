import Redis from "ioredis";
import {env} from "./env";


export const redis=new Redis({
    host:env.REDIS_HOST || "127.0.0.1",
    port:Number(env.REDIS_PORT) || 6379,

    maxRetriesPerRequest:null, 
});

//connection events
redis.on("connect",()=>{
    console.log("[redis] connected");
});

redis.on("error",(err)=>{
    console.error("[redis] error:",err);
});