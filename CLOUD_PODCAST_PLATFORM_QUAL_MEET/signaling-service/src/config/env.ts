import dotenv from "dotenv";

dotenv.config();


function requireEnv(key:string):string{
    const value=process.env[key];

    if(!value){
        throw new Error(`Missing required env variable : ${key}`);
    }

    return value;
}


export const env={
    PORT:Number(process.env.PORT ?? 4000),

    JWT_PUBLIC_KEY:requireEnv("JWT_PUBLIC_KEY").replace(/\\n/g,"\n"),

    REDIS_HOST:process.env.REDIS_HOST ?? "127.0.0.1",
    REDIS_PORT:Number(process.env.REDIS_PORT ?? 6379),
};


