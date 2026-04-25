
export function requireEnv(name:string):string{
    const value=process.env[name];

    if(!value){
        throw new Error(`Environment variable ${name} is required but not set`);
    }

    return value;
}

export const DATABASE_URL=requireEnv("DATABASE_URL");

export const PORT=Number(process.env.PORT ?? 5000);

export const ROOM_SERVICE_URL=process.env.ROOM_SERVICE_URL ?? "http://localhost:4000";      

export const REDIS_HOST=process.env.REDIS_HOST ?? "127.0.0.1";
export const REDIS_PORT=Number(process.env.REDIS_PORT ?? 6379);