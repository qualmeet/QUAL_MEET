import { apiRequest } from "./client";

export async function initRecording(roomId: string){
    return apiRequest<{sessionId:string}>(
        "/api/media/recordings/init",{
        method:"POST",
        auth:true,
        body:JSON.stringify({roomId}) 
    });
}

//creates entry in db for chunk and mark uploade :false and return upload url to which client can directly upload the chunk
export async function getUploadUrl(sessionId:string,chunkIndex:number){
    return apiRequest<{uploadUrl: string}>(
        "/api/media/recordings/upload-url",
        {
            method:"POST",
            auth:true,
            body:JSON.stringify({sessionId,chunkIndex})
        }
    );
}

//updates entry of chunk in db uploaded:true
export async function confirmChunk(sessionId:string,chunkIndex:number){
    return apiRequest(
        "/api/media/recordings/chunk-complete",
        {
            method:"POST",
            auth:true,
            body:JSON.stringify({sessionId,chunkIndex}),
        }
    );
}

export async function completeRecording(sessionId:string){
    return apiRequest(
        "/api/media/recordings/complete",
        {
            method:"POST",
            auth:true,
            body:JSON.stringify({sessionId}),
        }
    );
}

export async function getRecordingStatus(sessionId:string){
    return apiRequest(
        `/api/media/recordings/${sessionId}`,
        {
            method:"GET",
            auth:true,
        }
    );
}

export async function forceStopRecording(sessionId:string){
    return apiRequest("/api/media/recordings/force-stop",{
        method:"POST",
        body:JSON.stringify({sessionId}),
    });
}

export async function getMyRecordings(){
    return apiRequest<{recordings:any[]}>(
        "/api/media/recordings/my",
        {
            method:"GET",
            auth:true,
        }
    );
}