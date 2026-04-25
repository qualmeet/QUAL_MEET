import { useRef,useState,useEffect } from "react";
import { Socket } from "socket.io-client";
import { 
    initRecording,
    getUploadUrl,
    confirmChunk,
    completeRecording,
    forceStopRecording,
 } from "@/api/recording";

export function useRecording(
    roomId:string | null,
    cameraStream:MediaStream | null,
    socket:Socket | null,
){  
    //to hold media recorder instance 
    const mediaRecorderRef=useRef<MediaRecorder | null>(null);

    const [sessionId,setSessionId]=useState<string | null>(null);

    const [isRecording,setIsRecording]=useState(false);

    const sessionIdRef=useRef<string | null>(null);
    const cameraStreamRef=useRef<MediaStream | null>(null);
    const isStartingRef=useRef(false);
    const isStoppingRef=useRef(false);
    const isRecordingRef=useRef(false);

    const chunkIntervalRef=useRef<ReturnType<typeof setInterval> | null>(null);

    //to prevent parallel uploads of chunks
    const uploadQueue=useRef<any[]>([]);
    //ensure only 1 upload at a time
    const isUploading=useRef(false);

    //ordering of chunks
    const chunkIndex=useRef(0);

    useEffect(()=>{
        cameraStreamRef.current=cameraStream;
    },[cameraStream]);

    useEffect(()=>{
        if(!socket)
            return;

        const handleStart=()=>{
            console.log("Received start_recording",Date.now());
            startRecording();
        }

        const handleStop=()=>{
            console.log("Recevied stop_recording");

            if(!mediaRecorderRef.current){
                console.warn(" Stop ignored->recorder not ready");
                return;
            }
            stopRecording();
        }

        socket.on("start_recording",handleStart);
        socket.on("stop_recording",handleStop);

        return()=>{
            socket.off("start_recording",handleStart);
            socket.off("stop_recording",handleStop);
        }
    },[socket]); 

   


    const startRecording=async()=>{

        if(isStartingRef.current || mediaRecorderRef.current
             || isRecordingRef.current
        ){
            console.warn("Recorder already exists-> skipping");
            return;
        }

        if(sessionIdRef.current){
            console.warn("Session already exists -> skip init");
            return;
        }

        const stream=cameraStreamRef.current;

        if(!roomId || !stream){
            console.warn("Missing roomId or stream");
            return;
        }

        isStartingRef.current=true;

        try{
            console.log("RECORDING STARTING...");
            //STEP 1 : INIT session
            const res=await initRecording(roomId);
            const session=res.sessionId;

            setSessionId(session);
            sessionIdRef.current=session;

            //step 2: creating media recorder 
            const recorder=new MediaRecorder(stream,{
                mimeType:"video/webm;codecs=vp8,opus",
            });


            mediaRecorderRef.current=recorder;
            chunkIndex.current=0;

            //step 3: on data available event create chunk and add to upload queue
            recorder.ondataavailable=(event)=>{

                if(event.data && event.data.size>0){
                    uploadQueue.current.push({
                        chunk:event.data,
                        index:chunkIndex.current++,
                        retries:0,
                    });

                    if(!isUploading.current){
                        const sid = sessionIdRef.current;
                        if (sid) {
                            console.log("calling processQueue from ondataavaliable");
                            processQueue(sid);
                        }
                    }
                }
            };

            //record continuslly 
            recorder.start();

            chunkIntervalRef.current=setInterval(()=>{
                if(mediaRecorderRef.current?.state === "recording"){
                    mediaRecorderRef.current.requestData();
                }
            },2000);

            setIsRecording(true);
            isRecordingRef.current=true;

            console.log("RECORDING STARTED");
        }
        catch(error){
            console.error("Failed to start recording : ",error);

            socket?.emit("recording_failed");
        }
        finally{
            isStartingRef.current=false;
        }
    }



    const processQueue=async(sessionId:string)=>{
        if(isUploading.current || uploadQueue.current.length===0)
            return;

        isUploading.current=true;

        const task=uploadQueue.current.shift();
        
        const {chunk,index,retries}=task;

        try{
            console.log("chunk ready to get upload ",{index});
            //step 1 :get upload url for the chunk
            const {uploadUrl}=await getUploadUrl(sessionId,index);

            //step 2: uplaod chunk to url
            await fetch(uploadUrl,{
                method:"PUT",
                body:chunk,
                headers:{
                    "Content-Type":"video/webm"
                }
            });

            //step 3: confirm chunk upload
            await confirmChunk(sessionId,index);  
            console.log("chunk successfully uploaded ",{index});
        }
        catch(error){
            console.error(`Chunk ${index} upload failed : `,error);

            if(error instanceof Error && error?.message?.includes("already uploaded")){
                console.log(`Chunk ${index} db entry exists but S3 upload may have failed`);
                return;
            }

            if(retries<3){
                uploadQueue.current.unshift({
                    chunk,
                    index,
                    retries:retries+1,
                });
            }
            else{
                console.error("Critical uplaod failure");

            }
        }
        finally{
            isUploading.current=false;

            if(uploadQueue.current.length>0){
                const sid=sessionIdRef.current;
                if(sid){
                    console.log("Calling process queue from finally");
                    processQueue(sid);
                }
            }
            else{
                console.log("Queue drain stopped (no active session)");
            }
            
        }
    }

    const stopRecording=async()=>{

        if(isStoppingRef.current){
            console.warn("Already stopping -> skip");
            return;
        }

        isStoppingRef.current=true;
        const session=sessionIdRef.current;

        try{
            const recorder=mediaRecorderRef.current;

            if(!recorder || !session){
                console.warn("No recorder/session found");
                return;
            }

            console.log("STOPPING RECORDER....");

            //1. stopping interval
            if(chunkIntervalRef.current){
                clearInterval(chunkIntervalRef.current);
                chunkIntervalRef.current=null;
            }

            //2. force last chunk
            if(recorder.state==="recording"){
                recorder.requestData();
            }

            //3.wait for final chunk
            await new Promise((res)=>setTimeout(res,300));

            //4.stop properly
            await new Promise<void>(resolve=>{
                recorder.onstop=()=>resolve();

                if(recorder.state!== "inactive"){
                    recorder.stop();
                }
                else{
                    resolve();
                }
            });

            //all ondatavailable events have now fired, final chunk is in queue
            isRecordingRef.current=false;

            mediaRecorderRef.current=null;

            setIsRecording(false);

            //wait for all pending uploads to complete

            while(uploadQueue.current.length > 0 || isUploading.current){
                console.log("Waiting for all chunks to get uploaded....");
                await new Promise((res)=>setTimeout(res,300));
            }

            console.log("All chunks uploaded");

            //complete recording session
            await completeRecording(session);

             //clearing queue
            uploadQueue.current=[];

            sessionIdRef.current=null;
            setSessionId(null);

            console.log("RECORDER STOPPED");
        }
        catch(error){
            console.error("Failed to stop recording ->forcing cleanup: ",error);
            if (chunkIntervalRef.current) {
                clearInterval(chunkIntervalRef.current);
                chunkIntervalRef.current = null;
            }
            mediaRecorderRef.current = null;
            sessionIdRef.current = null;
            isRecordingRef.current = false;
            setIsRecording(false);
            setSessionId(null);
            uploadQueue.current = [];
            
            if(session){
                await forceStopRecording(session);
            }
        }
        finally{
            isStoppingRef.current=false;
        }
    }

    return {
        isRecording,
        stopRecording
    }
}