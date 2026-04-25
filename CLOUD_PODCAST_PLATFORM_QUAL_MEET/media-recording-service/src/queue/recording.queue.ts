import { Queue } from "bullmq";
import Redis from "ioredis";
import { env } from "process";

const connection=new Redis({
    host:env.REDIS_HOST || "127.0.0.1",
    port:Number(env.REDIS_PORT) || 6379,

    maxRetriesPerRequest:null, 
});

export const recordingQueue=new Queue("recording-processing",{
    connection,
    defaultJobOptions:{
        removeOnComplete:50,  //keep last 50 successfull jobs
        removeOnFail:100,      // keep last 100 failed jobs
    }
});


(async () => {
    await recordingQueue.clean(0, 1000, "completed");
    await recordingQueue.clean(0, 1000, "failed");
    console.log("Old BullMQ jobs cleaned");
})();