import {redis} from "../config/redis";

export interface RoomUser{
    socketId:string;
    userId:string;
    fullName:string;
    role:"HOST" | "GUEST";
    micEnabled:boolean;
    camEnabled:boolean;
    isScreenSharing:boolean;
}


function getRoomKey(roomId:string){

    return `room:${roomId}:users`;
}


export async function addUserToRoomAtomic(
    roomId:string,
    user:RoomUser,
    maxUsers:number
){

    const key=getRoomKey(roomId);

    const lua=`
        local key= KEYS[1]
        local socketId=ARGV[1]
        local userData=ARGV[2]
        local maxUsers=tonumber(ARGV[3])

        --duplicate socket check
        if redis.call("HEXISTS",key,socketId)==1 then
            return "ALREADY_EXISTS"
        end

        --current count of users in the room
        local count=redis.call("HLEN",key)

        --capacity check
        if count>=maxUsers then
            return "ROOM_FULL"
        end

        --add useru
        redis.call("HSET",key,socketId,userData)

        return "OK"
    `;

    const result=(await redis.eval(
        lua,
        1,
        key,
        user.socketId,
        JSON.stringify(user),
        maxUsers.toString()
    )) as "OK" | "ALREADY_EXISTS" | "ROOM_FULL";

    return result;

}


export async function isUserInRoom(
    roomId:string,
    socketId:string,
):Promise<boolean>{

    const key=getRoomKey(roomId);

    const exists=await redis.hexists(key,socketId);

    return exists===1;
}


export async function getRoomUsers(roomId:string):Promise<RoomUser[]>{
    const key=getRoomKey(roomId);

    const users=await redis.hgetall(key);

    return Object.values(users).map((u)=>JSON.parse(u));
}


export async function getUser(roomId:string,socketId:string):Promise<RoomUser| null>{
    const key=getRoomKey(roomId);

    const user=await redis.hget(key,socketId);

    return user ? JSON.parse(user) : null;
}

export async function updateUser(
    roomId:string,
    socketId:string,
    updates:Partial<RoomUser>
){
    const existing =await getUser(roomId,socketId);

    if(!existing)
        return;

    const updated={...existing,...updates};

    const key=getRoomKey(roomId);

    await redis.hset(key,socketId,JSON.stringify(updated));
}


export async function removeUserFromRoom(roomId:string,socketId:string){
    const key=getRoomKey(roomId);

    await redis.hdel(key,socketId);
}


export async function isRoomEmpty(roomId:string):Promise<boolean>{
    const key=getRoomKey(roomId);

    const count=await redis.hlen(key);

    return count===0;
}


export async function deleteRoom(roomId:string){
    const key=getRoomKey(roomId);

    await redis.del(key);
}


//-----SCREEN SHARE LOCK----//
export async function startScreenShareLock(
    roomId:string,
    socketId:string,
):Promise<boolean>{

    const key=`room:${roomId}:screen_share`;

    //set NX -> only set if not exists,EX-> expire after 30 sec to prevent deadlock
    const result =await redis.set(
        key ,
        socketId ,
        "EX",
        30,
        "NX"
    );

    return result==="OK";
}

//release screen share lock
export async function stopScreenShareLock(
    roomId:string,
    socketId:string
){
    const key=`room:${roomId}:screen_share`;

    const current=await redis.get(key);

    //only owner can release the lock
    if(current===socketId){
        await redis.del(key);
    }
}




//-----------HEARTBEART MECHANISM-------------

export async function setHeartbeat(socketId:string){
    const key=`presence:${socketId}`;

    //TIME TO LIVE = 30 sec
    await redis.set(key,"1","EX",30);
}


//---CLEANUP STALE USERS ----//
export async function cleanupStaleUsers(roomId:string){
    const key=getRoomKey(roomId);

    const users=await redis.hgetall(key);

    for(const [socketId,userData] of Object.entries(users)){
        const presenceKey=`presence:${socketId}`;

        const exists=await redis.exists(presenceKey);

        if(!exists){

            //user is stale
            await redis.hdel(key,socketId);
            console.log(`Removed stale user with socketId ${socketId} from room ${roomId}`);
        }
    }
}