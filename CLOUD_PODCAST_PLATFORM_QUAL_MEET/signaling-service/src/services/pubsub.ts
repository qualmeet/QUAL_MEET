import { redis } from "../config/redis";

const pub=redis.duplicate();
const sub=redis.duplicate();

const CHANNEL="signaling";

type Message={
    type:string;
    payload:any;
}

//Init function
export async function initPubSub(){
    console.log("[redis] pub/sub connected");
}

//publish function 
export async function publish(message:Message){
    await pub.publish(CHANNEL,JSON.stringify(message));
}


let isSubscribed=false;

//subscribe function
export async function subscribe(handler:(msg:Message)=>void){


    if(isSubscribed){
        console.log("[redis] subscribed to channel once");
        return;
    }

    isSubscribed=true;

    
    await sub.subscribe(CHANNEL);

    sub.on("message", (channel: string, rawMessage: string) => {

        if (channel !== CHANNEL) return;

        try {
            const msg: Message = JSON.parse(rawMessage);
            handler(msg);
        } catch (error) {
            console.error("Failed to parse message:", error);
        }
    });
}