import {apiRequest} from "./client";

interface IceServer{
    urls:string[] | string;
    username?:string;
    credential?:string;
}

interface IceServerResponse{
    iceServers:IceServer[];
    ttl:number;
}


export async function getIceServers(roomId:string):Promise<IceServerResponse>{

    return apiRequest<IceServerResponse>(`/api/turn/ice-servers?roomId=${roomId}`,{
        method:"GET",
        auth:true,
    });
}