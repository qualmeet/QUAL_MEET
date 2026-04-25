import {Request,Response} from "express";
import { ChunkCompleteRequestDTO, CompleteRecordingRequestDTO, InitRecordingRequestDTO } from "../dto/recording.dto";
import { initRecording, uploadUrl,chunkComplete,completeRecording,getMyRecordings,forceStopRecording, getRecordingStatus} from "../services/recording.service";
import { UploadUrlRequestDTO } from "../dto/recording.dto";



export async function initRecordingController(req:Request,res:Response){
    try{

        console.log("Recording initaited");

        const userId=req.header("x-user-id");

        if(!userId){
            return res.status(401).json({
                error:"Missing user identity",
            });
        }

        const body=req.body as InitRecordingRequestDTO;

        if(!body.roomId){
            return res.status(400).json({
                error:"roomId is required",
            });
        }

        const result=await initRecording({
            userId,
            roomId:body.roomId,
        });

        console.log("Recording initated , session created in db");

        return res.status(200).json(result);


    }
    catch(error){
        if(error instanceof Error){
            switch(error.message){
                case "NOT_AUTHORIZED":
                    return res.status(403).json({
                        error:"User not authorized to start recording for this room",
                    });

                case "ACTIVE_SESSION_EXISTS":
                    return res.status(409).json({
                        error:"A recording session is already in progress for this room",
                    });
            }
        }

        console.error("Error in initRecording:",error);
        
        return res.status(500).json({
            error:"Internal server error",
        });
    }
}



export async function uploadUrlController(req:Request,res:Response){
    try{

        console.log("upload-url request");

        const userId=req.header("x-user-id");

        if(!userId){
            return res.status(401).json({
                error:"Missing user identity",
            });
        }

        const body=req.body as UploadUrlRequestDTO;

        if(!body.sessionId || body.chunkIndex===undefined){
            return res.status(400).json({
                error:"sessionId and chunkIndex are required",
            });
        }

        const parsedChunkIndex=Number(body.chunkIndex);

        if(isNaN(parsedChunkIndex)){
            return res.status(400).json({
                error:"Invalid chunkIndex",
            })
        }

        const result=await uploadUrl({
            userId,
            sessionId:body.sessionId,
            chunkIndex:parsedChunkIndex,
        });

        console.log("upload url successfully returned");

        return res.status(200).json(result);



    }catch(error){
        if(error instanceof Error){
            switch(error.message){
                
                case "NOT_FOUND":
                    return res.status(404).json({
                        error:"Recording session not found",
                    });

                case "NOT_OWNER":
                    return res.status(403).json({
                        error:"Not owner of recording",
                    });

                case "INVALID_STATE":
                    return res.status(400).json({
                        error:"Recording not active",
                    });

                case "DUPLICATE_CHUNK":
                    return res.status(409).json({
                        error:"Chunk index already uploaded",
                    });
            }
        }

        console.error("Upload URL error:", error);

        return res.status(500).json({
        error: "Internal server error",
        });
    }
}


export async function chunkCompleteController(req:Request,res:Response){
    try{

        console.log("chunk uploaded request");
        const userId=req.header("x-user-id");

        if(!userId){
            return res.status(401).json({
                error:"Missing user identity",
            });
        }

        const body=req.body as ChunkCompleteRequestDTO;

        if(!body.sessionId || body.chunkIndex ===undefined){
            return res.status(400).json({
                error:"sessionId and chunkIndex required",
            });
        }

        const parsedChunkIndex=Number(body.chunkIndex);

        if(isNaN(parsedChunkIndex)){
            return res.status(400).json({
                error:"Invalid chunkIndex",
            })
        }

        const result=await chunkComplete({
            userId,
            sessionId:body.sessionId,
            chunkIndex:parsedChunkIndex
        });

        console.log("chunk uploaded successfully");

        return res.status(200).json(result);
    }
    catch(error){
        if(error instanceof Error){
            switch (error.message){
                case "NOT_FOUND":
                return res.status(404).json({ error: "Recording not found" });

                case "NOT_OWNER":
                return res.status(403).json({ error: "Not owner of recording" });

                case "CHUNK_NOT_FOUND":
                return res.status(404).json({ error: "Chunk not found" });
            }
        }
        console.error("Chunk complete error:", error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
}


//when user stoppd recording , finalize this session
export async function completeRecordingController(req:Request,res:Response){
    try{

        console.log("recording session completed request");

        const userId=req.header("x-user-id");

        if(!userId){
            return res.status(401).json({
                error:"Missing user identity",
            });
        }

        const body=req.body as CompleteRecordingRequestDTO;

        if(!body.sessionId){
            return res.status(400).json({
                error:"sessionId is required",
            });
        }

        const result=await completeRecording({
            userId,
            sessionId:body.sessionId,
        });

        console.log("recording session successfully completed");
        
        return res.status(200).json(result);
    }
    catch(error){
        if(error instanceof Error){
            switch(error.message){
                case "NOT_FOUND":
                    return res.status(404).json({ error: "Recording not found" });

                case "NOT_OWNER":
                    return res.status(403).json({ error: "Not owner of recording" });

                case "INVALID_STATE":
                    return res.status(400).json({ error: "Recording not active" });

                case "MISSING_CHUNKS":
                    return res.status(400).json({ error: "Some chunks missing" });
            }

            console.error("Complete recording error:", error);

            return res.status(500).json({
                error: "Internal server error",
            });
        }
    }
}


export async function getRecordingStatusController(req:Request,res:Response){
    try{
        const userId=req.header("x-user-id");

        const {sessionId}=req.params;

        if(!userId){
            return res.status(401).json({
                error:"Missing user identity",
            });
        }

        const result=await getRecordingStatus({
            userId,
            sessionId,
        });

        return res.status(200).json(result);
    }
    catch(error){
        if (error instanceof Error) {
            switch (error.message) {
                case "NOT_FOUND":
                return res.status(404).json({ error: "Recording not found" });

                case "NOT_OWNER":
                return res.status(403).json({ error: "Not owner of recording" });
            }
        }

        console.error("Get recording status error:", error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
}


export async function forceStopRecordingController(req:Request,res:Response){
    try{
        const {sessionId}=req.body;

        if(!sessionId){
            return res.status(400).json({
                error:"sessionId is required"
            });
        }

        const result=await forceStopRecording(sessionId);


        return res.status(200).json({
            message:"Recording force stopped",
            data:result,
        });
    }
    catch(error){
        console.error("forceStopRecording error:",error);

        return res.status(500).json({
            error:"Internal server error",
        });
    }
}


export async function getMyRecordingsController(req:any,res:any){
    try{
        const userId=req.header("x-user-id");

        if(!userId){
            return res.status(401).json({
                error:"UNAUTHORIZED"
            });
        }


        const recordings=await getMyRecordings(userId);


        return res.status(200).json({
            recordings,
        });
    }
    catch(error:any){
        console.error("getMyRecodings error:",error);

        if(error.message==="UNAUTHORIZED"){
            return res.status(401).json({
                error:"UNAUTHORIZED"
            });
        }

        return res.status(500).json({
            error:"FAILED_TO_FETCH_RECORDINGS",
        });
    }
}