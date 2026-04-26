import { prisma } from "../db/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/s3";
import { recordingQueue } from "../queue/recording.queue";

interface InitRecordingInput{
    userId:string;
    roomId:string;
}

interface UploadUrlInput{
    userId:string;
    sessionId:string;
    chunkIndex:number;
}

interface ChunkCompleteInput{
    userId:string;
    sessionId:string;
    chunkIndex:number;
}

interface CompleteRecordingInput{
    userId:string;
    sessionId:string;
}

interface GetRecordingStatusInput{
    userId:string;
    sessionId:string;
}

export async function initRecording(input:InitRecordingInput) {
    const { userId, roomId } = input;

    //step 1 :verifying user is in the room 
    const response = await fetch(
        `${process.env.ROOM_SERVICE_URL}/${roomId}/authorize`,
        {
            method: "POST",
            headers: {
                "x-user-id": userId
            }
        }
    );

    if(!response.ok){
        throw new Error("NOT_AUTHORIZED");
    }

    //step 2: checking if any active recording session exists for the room
    const exisitingSession = await prisma.recording.findFirst({
        where:{
            userId,
            roomId,
            status:"RECORDING",
        },
    });

    if(exisitingSession){
        console.log("Returning existing session instead of throwing");

        return {
            sessionId: exisitingSession.id,
            roomId: exisitingSession.roomId,
            userId: exisitingSession.userId,
            status: exisitingSession.status,
        };
    }

    //step 3:create a new recording session in the database
    const recording=await prisma.recording.create({
        data:{
            userId,
            roomId,
            status:"RECORDING",
        }
    });

    return{
        sessionId:recording.id,
        roomId:recording.roomId,
        userId:recording.userId,
        status:recording.status,
    };
}


export async function uploadUrl(input:UploadUrlInput){
    const {userId,sessionId,chunkIndex}=input;

    //step 1:find recording

    const recording=await prisma.recording.findUnique({
        where:{id:sessionId},
    });

    if(!recording){
        throw new Error("NOT_FOUND");
    }

    if(recording.userId!==userId){
        throw new Error("NOT_OWNER");
    }

    if(recording.status!=="RECORDING"){
        throw new Error("INVALID_STATE");
    }

    //step 2: checking duplicate chunk
    const existingChunk =await prisma.recordingChunk.findUnique({
        where:{
            recordingId_chunkIndex:{
                recordingId:sessionId,
                chunkIndex,
            },
        },
    });
            
    if(existingChunk){
        throw new Error("DUPLICATE_CHUNK");
    }


    //step 3: generate file key
    const key = `${recording.roomId}/${recording.userId}/${sessionId}/chunk_${chunkIndex}.webm`;

    const command=new PutObjectCommand({
        Bucket:process.env.S3_BUCKET!,
        Key:key,
        ContentType:"video/webm",
    });

    //step 4:url
    const uploadUrl=await getSignedUrl(s3,command,{
        expiresIn:60*5, //5 mins
    });

    console.log(`Upload url created for chunk => ${chunkIndex}  uploadUrl=>${uploadUrl}`);

    // //step 5: create recording chunk entry in db
    // await prisma.recordingChunk.create({
    //     data:{
    //         recordingId:sessionId,
    //         chunkIndex,
    //         uploaded:false,
    //     }
    // });


    // console.log("Db entry created for chunk ",{chunkIndex});


    return{
        uploadUrl,
    };

}



//when chunk gets uploaded then we call this API to mark the chunk as uploaded in db and also update of that chunk as uplaoded=true in db
// export async function chunkComplete(input:ChunkCompleteInput){
//     const {userId,sessionId,chunkIndex}=input;

//     //step1: verifying recording session
//     const recording =await prisma.recording.findUnique({
//         where:{id:sessionId},
//     });

//     if(!recording){
//         throw new Error("NOT_FOUND");
//     }

//     if(recording.userId !== userId){
//         throw new Error("NOT_OWNER");
//     }

//     //step 2:find chunk 
//     const chunk =await prisma.recordingChunk.findUnique({
//         where:{
//             recordingId_chunkIndex:{
//                 recordingId:sessionId,
//                 chunkIndex
//             }
//         }
//     });

//     if(!chunk){
//         throw new Error("CHUNK_NOT_FOUND");
//     }

//     if(chunk.uploaded){
//         return {
//             message:"Already marked uploaded",
//         }
//     }


//     const key = `${recording.roomId}/${recording.userId}/${sessionId}/chunk_${chunkIndex}.webm`;

//     //updating chunk uplaoded:true
//     await prisma.recordingChunk.update({
//         where:{
//             recordingId_chunkIndex:{
//                 recordingId:sessionId,
//                 chunkIndex,
//             },
//         },
//         data:{
//             uploaded:true,
//             fileUrl:`https://${process.env.S3_BUCKET}.${process.env.S3_ENDPOINT?.replace(
//                 "https://","")}/${key}`,
//         },
//     });



//     return {
//         message:"Chunk marked as uploaded",
//     }
// }


export async function chunkComplete(input:ChunkCompleteInput){
    const {userId,sessionId,chunkIndex}=input;

    //step1: verifying recording session
    const recording =await prisma.recording.findUnique({
        where:{id:sessionId},
    });

    if(!recording){
        throw new Error("NOT_FOUND");
    }

    if(recording.userId !== userId){
        throw new Error("NOT_OWNER");
    }

    const publicBaseUrl = process.env.R2_PUBLIC_URL;
    const key = `${recording.roomId}/${recording.userId}/${sessionId}/chunk_${chunkIndex}.webm`;

    //updating chunk uplaoded:true
    await prisma.recordingChunk.upsert({
        where:{
            recordingId_chunkIndex:{
                recordingId:sessionId,
                chunkIndex,
            },
        },
        update:{
            uploaded:true,
            fileUrl: `${publicBaseUrl}/${key}`,
        },
        create:{
            recordingId:sessionId,
            chunkIndex,
            uploaded:true,
            fileUrl: `${publicBaseUrl}/${key}`,
        }
    });



    return {
        message:"Chunk marked as uploaded",
    }
}




export async function completeRecording(input:CompleteRecordingInput){
    const {userId,sessionId}=input;

    //step 1:verifying recording session
    const recording =await prisma.recording.findUnique({
        where:{id:sessionId},
    });
    if(!recording){
        throw new Error("NOT_FOUND");
    }


    if(recording.userId !==userId){
        throw new Error("NOT_OWNER");
    }

    if(recording.status!=="RECORDING"){
        throw new Error("INVALID_STATE");
    }

    //step 2: fetchinng all chunks
    const chunks=await prisma.recordingChunk.findMany({
        where:{
            recordingId:sessionId,
        }
    });


    if(chunks.length === 0){
        throw new Error("MISSING_CHUNKS");
    }

    //step 3: checking for missing or unuploaded chunks 
    const notUploaded=chunks.filter((c)=>!c.uploaded);

    if(notUploaded.length>0){
        throw new Error("MISSING_CHUNKS");
    }

    //step 4: mark as processing in db
    await prisma.recording.update({
        where:{id:sessionId},
        data:{
            status:"PROCESSING",
        }
    });

    //step 5: add a task to queue for processing the recording (merging chunks and generating final url)
    await recordingQueue.add("process-recording",{
        sessionId,
        userId
    });

    return {
        message:"Recording finalized ,processing started",
        totalChunks:chunks.length,
    }

}

export async function getRecordingStatus(input:GetRecordingStatusInput){
    const {userId,sessionId}=input;

    //step 1:verifying recording session
    const recording=await prisma.recording.findUnique({
        where:{id:sessionId},
    });

    if(!recording){
        throw new Error("NOT_FOUND");
    }

    if(recording.userId!==userId){
        throw new Error("NOT_OWNER");
    }


    //step2 : getting chunks stats
    const totalChunks=await prisma.recordingChunk.count({
        where:{recordingId:sessionId},
    });

    const uploadedChunks=await prisma.recordingChunk.count({
        where:{
            recordingId:sessionId,
            uploaded:true,
        }
    });


    return {
        sessionId:recording.id,
        status:recording.status,
        totalChunks,
        uploadedChunks,
        finalUrl:recording.finalUrl || null,
    }
}

export async function forceStopRecording(sessionId:string){
    const session=await prisma.recording.findUnique({
        where:{id:sessionId},
    });

    if(!session){
        throw new Error("SESSION_NOT_FOUND");
    }


    if(session.status!== "RECORDING"){
        return session;
    }

    const updated=await prisma.recording.update({
        where:{id:sessionId},
        data:{
            status:"FAILED",
        }
    });

    return updated;
}



export async function getMyRecordings(userId:string){
    if(!userId){
        throw new Error("UNAUTHORIZED");
    }

    const recordings=await prisma.roomRecording.findMany({
        where:{userId},
        orderBy:{createdAt:"desc"},
    });

    //empty array is not an error (as user may not have any recordings)
    return recordings;
}