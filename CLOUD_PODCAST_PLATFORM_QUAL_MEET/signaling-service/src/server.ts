import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { env } from "./config/env";
import { isUserInRoom,getRoomUsers,updateUser,getUser, addUserToRoomAtomic, setHeartbeat, cleanupStaleUsers, startScreenShareLock, stopScreenShareLock } from "./services/roomStore";
import { removeUserFromRoom,isRoomEmpty,deleteRoom } from "./services/roomStore";
import { initPubSub,publish,subscribe } from "./services/pubsub";
import { redis } from "./config/redis";

// (async () => {
//   try {
//     const pong = await redis.ping();
//     console.log("[redis] ping response:", pong);
//   } catch (err) {
//     console.error("[redis] ping failed:", err);
//   }
// })();

export interface JwtPayload {
  userId: string;
  email: string;
  fullName: string;
}

function parseCookies(cookieHeader?:string){
    if(!cookieHeader){
        return {};
    }

    return Object.fromEntries(
        cookieHeader.split(";").map(cookie=>{
            const [key,value]=cookie.trim().split("=");
            return [key,decodeURIComponent(value)];
    })
    )
}

export async function createServer() {
    const httpServer = http.createServer();

    const io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL, //frontend url
            credentials: true,
        }
    });

    //initializing redis pub/sub for inter-instance communication of signaling messages in case of multiple instances of signaling server running behind a load balancer
    await initPubSub();

    subscribe(async(msg)=>{
        const {type,payload}=msg;

        if(type==="webrtc_offer"){
            io.to(payload.to).emit("webrtc_offer",payload.data);
        }

        if(type==="webrtc_answer"){
            io.to(payload.to).emit("webrtc_answer",payload.data);
        }

        if(type==="webrtc_ice_candidate"){
            io.to(payload.to).emit("webrtc_ice_candidate",payload.data);
        }

         if (type === "media_state_changed") {
            io.to(payload.roomId)
            .except(payload.data.socketId) //no need to send to the one who changed the state as they already know about it
            .emit("media_state_changed", payload.data);
        }

        if (type === "screen_share_started") {
            io.to(payload.roomId)
            .except(payload.data.socketId)
            .emit("screen_share_started", payload.data);
        }

        if (type === "screen_share_stopped") {
            io.to(payload.roomId)
            .except(payload.data.socketId)
            .emit("screen_share_stopped", payload.data);
        }

        if(type==="room_users_update"){
            try{
                //cleanup stale users who might have disconnected without emitting disconnect event due to network issues or other reasons by checking their heartbeat timestamp in redis
                await cleanupStaleUsers(payload.roomId);

                const users=await getRoomUsers(payload.roomId);

                io.to(payload.roomId).emit("room_users",users);
            }
            catch(err){
                console.error("Error fetching users from redis: ", err);
            }
        }

        if (type === "peer_ready") {
            console.log("[PUBSUB] peer_ready:", payload);

            io.to(payload.roomId)
            .except(payload.data.socketId)
            .emit("peer_ready", payload.data);
        }

        if (type === "room_closed") {
            io.to(payload.roomId).emit("room_closed", payload.data);
        }

        if(type=== "force_disconnect"){
            io.sockets.sockets.get(payload.socketId)?.disconnect(true);
        }

        if(type==="user_left"){
            io.to(payload.roomId).emit("user_left",payload.data);
        }

        if(type==="start_recording"){
            io.to(payload.roomId).emit("start_recording",payload.data);
        }

        if(type==="stop_recording"){
            io.to(payload.roomId).emit("stop_recording",payload.data);
        }

        if (type === "CHAT_MESSAGE") {
            io.to(payload.roomId)
                .except(payload.senderSocketId)
                .emit("chat_message", payload);
        }
    });



    //cleanupStale users running it periodically
    setInterval(async()=>{
        try{
            const keys=await redis.keys("room:*:users");

            for(const key of keys){
                const roomId=key.split(":")[1];

                await cleanupStaleUsers(roomId);

                const users=await getRoomUsers(roomId);

                io.to(roomId).emit("room_users",users);
            }
        }catch(err){
            console.error("Error in periodic cleanup of stale users: ", err);
        }
    },10000);



    //connection guards
    const ipConnections = new Map<string, number>();  //1 ip => max 20sockets (as in company multiple people can have same ip)
    const userConnections = new Map<string, number>();  //1 userId =>max 3 sockets

    const MAX_IP_CONNECTIONS = 20;
    const MAX_USER_SOCKETS = 3;


    //users in a room map for signaling
    const roomUsers=new Map<
        string,         //roomId
        Map<
            string, //socket.id
            {   
                socketId:string;
                userId:string;
                role:"HOST" | "GUEST";
                fullName:string;
                micEnabled:boolean;
                camEnabled:boolean;
                isScreenSharing:boolean;
            }
        >
    >();


    //verifying jwt for webscoket connection
    io.use((socket, next) => {
        try {
            const cookieHeader=socket.handshake.headers.cookie;

            const cookies=parseCookies(cookieHeader);
            const token=cookies["access_token"];

            if (!token) {
                return next(new Error("UNAUTHORIZED"));
            }

            const decoded=jwt.verify(token, env.JWT_PUBLIC_KEY, {
                algorithms: ["RS256"],
            }) as JwtPayload;

            socket.data.user = {
                userId: decoded.userId,
                email: decoded.email,
                fullName: decoded.fullName
            };

            return next();
        }
        catch (err:any) {
            
            if(err.name==="TokenExpiredError"){
                return next(new Error("TOKEN_EXPIRED"));
            }
            return next(new Error("UNAUTHORIZED"));
        }
    });



    function getClientIp(socket: any): string {
        return socket.handshake.address || "unknown";
    }

    io.use((socket, next) => {
        const ip = getClientIp(socket);
        const userId = socket.data.user?.userId;

        if (!userId) {
            return next(new Error("UNAUTHORIZED"));
        }

        const ipCount = ipConnections.get(ip) ?? 0;
        if (ipCount >= MAX_IP_CONNECTIONS) {
            return next(new Error("RATE_LIMITED"));
        }

        const userCount = userConnections.get(userId) ?? 0;
        if (userCount >= MAX_USER_SOCKETS) {
            return next(new Error("TOO_MANY_CONNECTIONS"));
        }

        //increment counts
        ipConnections.set(ip, ipCount + 1);
        userConnections.set(userId, userCount + 1);

        //storing for cleaning up 
        socket.data._ip = ip;
        socket.data._userId = userId;

        next();
    })


    //helper function for wertc signaling event 
    function ensureInRoom(socket: any): string | null {
        return socket.data.roomId ?? null;
    }



    io.on("connection", (socket) => {
        const userId = socket.data._userId;
        const ip = socket.data._ip;
        console.log("[auth] socket connected: ", socket.id, "user: ", userId);


        //===============Authorization check first============//
        //checking first if user is allowed to join room by calling room service authorize
        socket.on("join_room", async ({ roomId }) => {
            try {

                console.log("Socket requesting to connect");

                if (!roomId || typeof roomId !== "string") {
                    socket.emit("join_error", { message: "INVALID_ROOM_ID" });
                    return;
                }

                const userId = socket.data.user.userId;

                const response = await fetch(
                    `${process.env.ROOM_SERVICE_URL}/rooms/${roomId}/authorize`,
                    {
                        method: "POST",
                        headers: {
                            "x-user-id": userId
                        }
                    }
                );

                if (!response.ok) {
                    socket.emit("join_error", { message: "NOT_AUTHORIZED" });
                    return;
                }

                const result = await response.json();

                const maxUsers=result.maxParticipants;

                const userData={
                    socketId:socket.id,
                    userId,
                    role:result.role,
                    fullName:socket.data.user.fullName,
                    micEnabled:true,
                    camEnabled:true,
                    isScreenSharing:false,
                }

                
                //added user to the room in redis for sharing between multiple instances of signaling server
               const redisResult=await addUserToRoomAtomic(roomId,userData,maxUsers);

               if(redisResult==="ALREADY_EXISTS"){
                    socket.emit("join_error",{
                        message:"DUPLICATE_JOIN"
                    }); 
                    return;
               }
               if(redisResult==="ROOM_FULL"){
                    socket.emit("join_error",{
                        message:"ROOM_FULL"
                    }); 
                    return;
               }


                let usersInRoom=roomUsers.get(roomId);
                if(!usersInRoom){
                    usersInRoom=new Map();
                    roomUsers.set(roomId,usersInRoom);
                }

               //updating local map
               usersInRoom.set(socket.id,userData);


                //if Authorized then
                socket.join(roomId);
                socket.data.roomId = roomId;
                socket.data.role = result.role;

                socket.emit("join_success", {
                    roomId,
                    role: result.role,
                });

                //-------SETTING HEARTBEAT -----------//
                await setHeartbeat(socket.id);

                //sending list of users to new joinee
                const users=await getRoomUsers(roomId);
                socket.emit("existing_peers",users);

                //publish the list of all users in the room  to other pariticpnats in the room 
                await publish({
                    type: "room_users_update",
                    payload: {
                        roomId,
                    },
                });
                

                console.log("[room] joined: ", roomId, "user: ", userId, "role: ", result.role);
            }
            catch (error) {
                console.error("[join room] error: ", error);
                socket.emit("join_error", { message: "INTERNAL_ERROR" });
            }
        })


        socket.on("peer_ready",async()=>{
            const roomId=socket.data.roomId;

            if(!roomId || ! (await isUserInRoom(roomId,socket.id)))
                return;

             await publish({
                type:"peer_ready",
                payload:{
                    roomId,
                    data:{
                        socketId:socket.id,
                    }
                }
             });
        });

        //when a camera or mic state chnages (disable/enable)
        socket.on("media_state_changed",async({micEnabled,camEnabled})=>{
            const roomId=socket.data.roomId;

            if(!roomId || ! (await isUserInRoom(roomId,socket.id)))
                return;

            const user=await getUser(roomId,socket.id);

            if(!user)
                return;

            user.micEnabled=micEnabled;
            user.camEnabled=camEnabled;

            await updateUser(roomId,socket.id,{micEnabled,camEnabled});

            // socket.to(roomId).emit("media_state_changed",{
            //     socketId:socket.id,
            //     micEnabled,
            //     camEnabled,
            // });

            await publish({
                type:"media_state_changed",
                payload:{
                    roomId,
                    data:{
                        socketId:socket.id,
                        micEnabled,
                        camEnabled,
                    }
                }
            });
        });


        socket.on("screen_share_start",async()=>{
            const roomId=socket.data.roomId;

            if(!roomId || ! (await isUserInRoom(roomId,socket.id)))
                return;

            
            //Enforcing single presenter
            const acquired=await startScreenShareLock(roomId,socket.id);
            if(!acquired){
                socket.emit("screen_share_denied");
                return;
            }

            //storing in redis this update
            await updateUser(roomId,socket.id,{
                isScreenSharing:true,
            });

            // io.to(roomId).emit("screen_share_started",{
            //     socketId:socket.id,
            // });

            await publish({
                type:"screen_share_started",
                payload:{
                    roomId,
                    data:{
                        socketId:socket.id,
                    }
                }
            });

            //refreshing the screen share lock ttl every 10 sec
            const interval=setInterval(async()=>{
                try{
                    const key=`room:${roomId}:screen_share`;

                    const current=await redis.get(key);

                    if(current === socket.id){
                        await redis.expire(key,30);
                    }
                }catch(err){
                    console.error("[screen lock refresh error]", err);
                }
            },10000);

            //storing interval reference for cleanup
            socket.data.screenShareInterval=interval;

            console.log("[screen] share started by ", socket.id);
        });

        socket.on("screen_share_stop",async()=>{
            const roomId=socket.data.roomId;

            if(!roomId || ! (await isUserInRoom(roomId,socket.id)))
                return;


            await stopScreenShareLock(roomId,socket.id);

            const user=await getUser(roomId,socket.id);

            if(!user || !user.isScreenSharing)
                return;

            user.isScreenSharing=false;

            await updateUser(roomId,socket.id,{
                isScreenSharing:false,
            });

            // io.to(roomId).emit("screen_share_stopped",{
            //     socketId:socket.id,
            // });

            await publish({
                type:"screen_share_stopped",
                payload:{
                    roomId,
                    data:{
                        socketId:socket.id,
                    }
                }   
            });

            if(socket.data.screenShareInterval){
                clearInterval(socket.data.screenShareInterval);
            }

            console.log("[screen] share stopped by ",  socket.id);

        });


        //===================CHAT EVENTS======================//
        socket.on("chat_message",async(data)=>{
            const user=socket.data.user;

            const roomId=socket.data.roomId;

            if(!roomId || ! (await isUserInRoom(roomId,socket.id)))
                return;

            if(!data.content || !data.content.trim())
                return;

            if(data.content.length > 1000)
                return;

            const message={
                id:crypto.randomUUID(),
                roomId,
                senderId:user.userId,
                senderSocketId:socket.id,
                fullName:user.fullName,
                content:data.content.trim(),
                createdAt:new Date().toISOString()
            };


            publish({
                type:"CHAT_MESSAGE",
                payload:message
            });
        })



        //================= WEBRTC SIGNALING EVENTS =========================//

        socket.on("webrtc_offer", async({to,sdp}) => {
            const roomId = ensureInRoom(socket);

            console.log("Offer received from ",socket.id);

            if (!roomId || !to || ! (await isUserInRoom(roomId,socket.id))) {
                socket.emit("signal_error", { message: "NOT_IN_ROOM" });
                return;
            }

            // io.to(to).emit("webrtc_offer", {
            //     from: socket.id,
            //     sdp,
            // });

            await publish({
                type:"webrtc_offer",
                payload:{
                    to,
                    data:{
                        from:socket.id,
                        sdp,
                    },
                },
            });

        });


        socket.on("webrtc_answer", async({to,sdp}) => {
            const roomId = ensureInRoom(socket);

            console.log("Answer received from ",socket.id);

            if (!roomId || !to || ! (await isUserInRoom(roomId,socket.id))) {
                socket.emit("signal_error", { message: "NOT_IN_ROOM" });
                return;
            }

            // io.to(to).emit("webrtc_answer", {
            //     from: socket.id,
            //     sdp,
            // });

            await publish({
                type:"webrtc_answer",
                payload:{
                    to,
                    data:{
                        from:socket.id,
                        sdp,
                    },
                },
            });
        });

        socket.on("webrtc_ice_candidate", async({to,candidate}) => {
            const roomId = ensureInRoom(socket);

            console.log("ICE CANDIDATE received from ",socket.id);

            if (!roomId || !to || ! (await isUserInRoom(roomId,socket.id))) {
                socket.emit("signal_error", { message: "NOT_IN_ROOM" });
                return;
            }

            // io.to(to).emit("webrtc_ice_candidate", {
            //     from: socket.id,
            //     candidate,
            // });

            await publish({
                type:"webrtc_ice_candidate",
                payload:{
                    to,
                    data:{
                        from:socket.id,
                        candidate,
                    }
                }
            })
        })


        //------------------Recording control events-----------------//
        socket.on("start_recording",async()=>{
            const roomId=socket.data.roomId;

            if(!roomId || !(await isUserInRoom(roomId,socket.id)))
                return;

            //only host allowed to start recording(so only host allowed to emit this event)
            if(socket.data.role!=="HOST"){
                socket.emit("recording_error",
                    {message:"ONLY_HOST_CAN_START_RECORDING"}
                );

                return;
            }

            console.log("[recording] start triggered by host: ",socket.id);

            await publish({
                type:"start_recording",
                payload:{
                    roomId,
                    data:{
                        startedBy:socket.id,
                    },
                },
            });
        })

        socket.on("stop_recording",async()=>{
            const roomId=socket.data.roomId;

            if(!roomId || !(await isUserInRoom(roomId,socket.id)))
                return;

            //only host allowed to start recording(so only host allowed to emit this event)
            if(socket.data.role!=="HOST"){
                socket.emit("recording_error",
                    {message:"ONLY_HOST_CAN_STOP_RECORDING"}
                );

                return;
            }

            console.log("[recording] stop triggered by host: ",socket.id);

            await publish({
                type:"stop_recording",
                payload:{
                    roomId,
                    data:{
                        stoppedBy:socket.id,
                    },
                },
            });

        })



        socket.on("leave_room",async()=>{
            const roomId=socket.data.roomId;

            if(!roomId || !(await isUserInRoom(roomId, socket.id)))
                return;

            const usersInRoom=roomUsers.get(roomId);

            const user=await getUser(roomId,socket.id);

            const role=socket.data.role;

            //-----------HOST leaves -> closing room for everyone--------//
            if(role==="HOST"){
                await publish({
                    type:"room_closed",
                    payload:{
                        roomId,
                        data:{
                            roomId,
                            reason:"HOST_LEFT",
                        }
                    }
                });

                const users=await getRoomUsers(roomId);
                //disconnectiong everyone in the room
                for(const user of users){
                     await publish({
                        type:"force_disconnect",
                        payload:{
                            socketId:user.socketId,
                        }
                    });
                }

                roomUsers.delete(roomId);

                await deleteRoom(roomId);

                console.log("[room] closed: ", roomId, "reason: HOST_LEFT");
                return;
            }


            //-----------GUEST leaves --------------//
            if(user?.isScreenSharing){
                await stopScreenShareLock(roomId,socket.id);

                await publish({
                    type:"screen_share_stopped",
                    payload:{
                        roomId,
                        data:{
                            socketId:socket.id,
                        }
                    }
                })

                if(socket.data.screenShareInterval){
                    clearInterval(socket.data.screenShareInterval);
                }
            }
            
          
            usersInRoom?.delete(socket.id);

            //removing user from the room in redis for sharing between multiple instances of signaling server
            await removeUserFromRoom(roomId,socket.id);

            socket.leave(roomId);

            await publish({
                type: "user_left",
                payload:{
                    roomId,
                    data:{
                        socketId:socket.id,
                    }
                }
            });

            //sending updated user list to others in the room
            await publish({
                type: "room_users_update",
                payload: {
                    roomId,
                },
            });

            const users=await getRoomUsers(roomId);
            if(users.length===0){
                roomUsers.delete(roomId);
                await deleteRoom(roomId);
                console.log("[room] deleted: ", roomId, "reason: empty after leave");
            }

            console.log("[leave room] socket left: ",socket.id);
        });



        socket.on("disconnect", async(reason) => {

            //RATE LIMITING CLEANUP
            if (ip) {
                const ipCount = ipConnections.get(ip) ?? 1;
                ipCount <= 1 ? ipConnections.delete(ip) : ipConnections.set(ip, ipCount - 1);
            }

            if (userId) {
                const userCount = userConnections.get(userId) ?? 1;
                userCount <= 1
                    ? userConnections.delete(userId)
                    : userConnections.set(userId, userCount - 1);
            }


            const roomId=socket.data.roomId;

            if(roomId){
                const usersInRoom=roomUsers.get(roomId);


                const user = await getUser(roomId, socket.id);

                if(user){

                    //screen sharing cleanup
                    if(user?.isScreenSharing){

                        await stopScreenShareLock(roomId, socket.id);

                        await publish({
                            type: "screen_share_stopped",
                            payload: {
                                roomId,
                                data: {
                                    socketId: socket.id,
                                },
                            },
                        });

                        if(socket.data.screenShareInterval){
                            clearInterval(socket.data.screenShareInterval);
                        }
                    }

                    //removing user from map
                    usersInRoom?.delete(socket.id);

                    //removing user from redis
                    await removeUserFromRoom(roomId,socket.id);

                    await publish({
                        type: "user_left",
                        payload: {
                            roomId,
                            data: {
                                socketId: socket.id,
                            }
                        }
                    });

                    //notifying others with updated list of users in the room
                    await publish({
                        type: "room_users_update",
                        payload: {
                            roomId,
                        },
                    });

                    // room empty check
                     const users=await getRoomUsers(roomId);
                    if(users.length===0){
                        roomUsers.delete(roomId);

                        await deleteRoom(roomId);

                        console.log("[room] deleted: ", roomId, "reason: empty after disconnect");
                    }
                }
            }


            console.log("[socket] disconnected: ",
                socket.id,
                "user: ",
                socket.data.user?.userId,
                "reason: ",
                reason
            );
        });

        



        //---- HEARTBEAT ----//
        socket.on("heartbeat",async()=>{
            await setHeartbeat(socket.id);
        })
    });

    return { httpServer, io };
}