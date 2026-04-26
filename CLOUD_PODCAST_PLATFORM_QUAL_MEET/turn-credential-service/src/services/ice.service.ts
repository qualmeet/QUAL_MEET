import { TurnServiceError } from "../errors/TurnServiceError";
import {
    ROOM_SERVICE_BASE_URL,
    STUN_URL,
    TURN_TCP_URL,
    TURN_UDP_URL,
} from "../config/env";

import { generateTurnCredentials } from "../utils/turn";


export async function getIceServerForUser(roomId:string,userId:string){

    const response=await fetch(`${ROOM_SERVICE_BASE_URL}/${roomId}/authorize`,
        {
            method:"POST",
            headers:{
                "x-user-id":userId,
            },
        }
    );

    if(response.status!=200){
        throw new TurnServiceError(
            "ROOM_AUTH_FAILED",
            response.status,
            `Room authorization failed status=${response.status}`
        );
        
    }


    //Gernating turn credentials
    const turnCreds=generateTurnCredentials(userId);

    return {
        iceServers:[
            {   urls:[
                    "stun:stun.l.google.com:19302",
                    "stun:stun.12connect.com:3478",
                    "stun:stun.12voip.com:3478",
                    "stun:stun.2talk.co.nz:3478", 
                    STUN_URL                // coturn server -> STUN+TURN
                ] 
            },
            {
                urls:[ TURN_UDP_URL, TURN_TCP_URL ],
                username:turnCreds.username,
                credential:turnCreds.credential,
            },
        ],
        ttl:turnCreds.ttl,
    };

}