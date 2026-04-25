import {Worker} from "bullmq";
import Redis from "ioredis";
import {exec} from "child_process";   //to execute ffmpeg commands
import { promisify } from "util";
import fs from "fs";                   //to create files
import path from "path";               // to handle paths
import {prisma} from "../db/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {s3} from "../config/s3";         
import { recordingQueue } from "../queue/recording.queue";
import util from "util";

const execAsync=util.promisify(exec);


const connection=new Redis({
    host:process.env.REDIS_HOST || "127.0.0.1",
    port:Number(process.env.REDIS_PORT) || 6379,

    maxRetriesPerRequest:null, 
});

export const worker=new Worker(
    "recording-processing",
    async(job)=>{
       
        if(job.name==="process-recording"){
             console.log("Processing job:",job.data);

            const {sessionId}=job.data;
  
            const tempDir=path.join(__dirname,"../../tmp",sessionId);

            try{
                    //step 1: creating a temporay directory to store downlaoded chunks from cloudlfare r2
                    fs.mkdirSync(tempDir,{recursive:true});


                    //step 2: fetching all chunks from db (needed for correct ordering for merging)
                    const chunks=await prisma.recordingChunk.findMany({
                        where:{
                            recordingId:sessionId,
                            uploaded:true
                        },
                        orderBy:{chunkIndex:"asc"}
                    });

                    if(chunks.length === 0){
                        throw new Error("No chunks found for recording session "+sessionId);
                    }

                    //step 3: downloading chunks from cloudflare r2 and storing locally in tmp directory
                    for(const chunk of chunks){
                        if(!chunk.fileUrl){
                            //throw new Error(`Missing fileUrl for chunk ${chunk.chunkIndex}`);
                            console.warn(`Missing fileUrl for chunk ${chunk.chunkIndex}`);
                            continue;
                        }

                        const res=await fetch(chunk.fileUrl);

                        if(!res.ok){
                            throw new Error(`Failed to download chunk ${chunk.chunkIndex} from ${chunk.fileUrl}`);
                        }

                        //R2(file)--->ArrayBuffer(raw binary)--->Buffer(Node format)--->write to disk
                        const buffer=Buffer.from(await res.arrayBuffer());

                        const filePath=path.join(tempDir,`chunk_${chunk.chunkIndex}.webm`);

                        fs.writeFileSync(filePath,buffer);

                        console.log("chunk downloaded ",chunk.chunkIndex);
                    }

                    //-------------------------------------------------------
                    // //step 4:creating list of donwloaded chunks paths for ffmpeg merging
                    // const listFilePath=path.join(tempDir,"list.txt");

                    // const fileListContent=chunks.map(
                    //     (chunk)=>`file '${path.join(tempDir, `chunk_${chunk.chunkIndex}.webm`)}'`
                    // ).join("\n");

                    // fs.writeFileSync(listFilePath,fileListContent);


                    // //step 10: running ffmpeg command to merge chunks
                    // const outputPath=path.join(tempDir,"final.webm");

                    // // -f concat---> merge files
                    // // -i list.txt---> input list of files to merge
                    // //-c copy ---> copy codec (no re-encoding for faster processing)
                    // await execAsync(
                    //     `ffmpeg -f concat -safe 0 -i "${listFilePath}" -c copy "${outputPath}"`
                    // );

                    const sortedChunks=chunks.sort((a,b)=>a.chunkIndex - b.chunkIndex);

                    const buffers=sortedChunks.map(chunk=>{
                        const filePath=path.join(tempDir,`chunk_${chunk.chunkIndex}.webm`);

                        return fs.readFileSync(filePath);
                    })

                    const combinedBuffer=Buffer.concat(buffers);

                    const rawPath=path.join(tempDir,"raw.webm");
                    fs.writeFileSync(rawPath,combinedBuffer);

                    // const listFilePath=path.join(tempDir,"fileList.txt");

                    // const fileListContent=chunks    
                    //     .map(chunk=>{
                    //         const absPath=path.join(tempDir,`chunk_${chunk.chunkIndex}.webm`);

                    //         //normalizing windows path
                    //         const normalizedPath=absPath.replace(/\\/g,"/");

                    //         return `file '${normalizedPath}'`;
                    //     }).join("\n");

                    // fs.writeFileSync(listFilePath,fileListContent);

                    const outputPath=path.join(tempDir,"final.webm");

                    const command = `ffmpeg -i "${rawPath}" -c copy "${outputPath}"`;

                   
                    console.log(" Running FFmpeg command:\n", command);

                    const {stdout,stderr}=await execAsync(command);
                    console.log("FFmpeg stdout: ",stdout);
                    console.log("FFmpeg stderr: ",stderr);

                    
                    const stats=fs.statSync(outputPath);
                    

                    if(stats.size <1000){
                        console.error("FFmpeg did not create output file:", outputPath);
                        throw new Error("FFMPEG_FAILED_NO_OUTPUT");
                    }


                    //step 11:uploading final merged file back to cloudflare r2
                    //reads file video into memeory
                    const finalBuffer=fs.readFileSync(outputPath);

                    //creating final key
                    const finalKey=`${sessionId}/final.webm`;

                    //uploading to r2
                    await s3.send(
                        new PutObjectCommand({
                            Bucket:process.env.S3_BUCKET!,
                            Key:finalKey,
                            Body:finalBuffer,
                            ContentType:"video/webm",
                        })
                    );

                    const publicBaseUrl = process.env.R2_PUBLIC_URL; 
                    //creating final url
                    const finalUrl=`${publicBaseUrl}/${finalKey}`;

                    

                    //step 12:updatinf recording  entry in db
                    await prisma.recording.update({
                        where:{id:sessionId},
                        data:{
                            status:"COMPLETED",
                            finalUrl:finalUrl,
                        }
                    });

                    console.log(`Recording session ${sessionId} completed successfully.`);
            
                    
                    //step 13: checking if all users are completed merging there own videos
                    const currentRecording=await prisma.recording.findUnique({
                        where:{id:sessionId}
                    });

                    if(!currentRecording){
                        throw new Error("Recording not found");
                    }

                    //getting all recordings for room
                    const allRecordings=await prisma.recording.findMany({
                        where:{
                            roomId:currentRecording.roomId
                        }
                    });

                    //COMPLETED--> good  FAILED--> ignore but continue
                    const allDone=allRecordings.every(r=>
                        r.status==="COMPLETED" || r.status==="FAILED"
                    );

                    if(allDone){
                        console.log("All users finished merging ---> triggering final merge");

                        //if two users finish at same time then race condtion hence lock 
                        const lockKey=`room_merge_lock:${currentRecording.roomId}`;

                        //NX->only set if key not exists
                        //EX-->expires (300 sec)
                        const lockAcquired=await connection.set(
                            lockKey,
                            "1",
                            "EX",
                            300,
                            "NX"
                        );

                        if(lockAcquired==="OK"){

                            console.log("lock acquired -> triggering final merge")
                            //adding new job to recordingQuue
                            await recordingQueue.add("merge-room",{
                                roomId:currentRecording.roomId
                            });
                        }
                        else{
                            console.log("Merge already triggered by another worker");
                        }
                    }
            
            
                }
            catch(error){
                    console.error("Worker failed",error);

                    //updating recording status to failed in db
                    await prisma.recording.update({
                        where:{id:sessionId},
                        data:{
                            status:"FAILED",
                        }
                    });

                    throw error; // to let bullmq handle retries based on its configuration
            }


            finally{
                    //cleanup always
                    try{
                        //step 13: deleting temp directory and files
                        fs.rmSync(tempDir,{recursive:true,force:true});
                    }
                    catch(cleanupError){
                        console.error("Error during cleanup",cleanupError);
                    }
            }

        }



        if(job.name === "merge-room"){

            //final merging of all users video

            console.log("Starting final room merge: ",job.data);

            const {roomId}=job.data;

            const tempDir=path.join(__dirname,"../../tmp2",`room-${roomId}-${Date.now()}`);

            try{
                //step 1: making a temporary directory to store all users video 
                fs.mkdirSync(tempDir,{recursive:true});

                //step 2: getting all final videos (url) from db
                const recordings=await prisma.recording.findMany({
                    where:{
                        roomId,
                        status:"COMPLETED"
                    }
                });

                if(recordings.length===0){
                    throw new Error("No completed recordings found in the room");
                }

                //step 3: downlaoding all users video from cloudflare r2 to local
                for(const rec of recordings){
                    if(!rec.finalUrl){
                        throw new Error(`Missing finalurl for user ${rec.userId}`);
                    }

                    const res=await fetch(rec.finalUrl);

                    if(!res.ok){
                        throw new Error(`Failed to download ${rec.finalUrl}`);
                    }

                    const buffer=Buffer.from(await res.arrayBuffer());

                    const filePath=path.join(tempDir,`user_${rec.userId}.webm`);

                    fs.writeFileSync(filePath,buffer);
                }


                //step 4: buidlign ffmpeg command(input list like aboce we created)
                const inputs = recordings
                    .map(rec => `-i "${path.join(tempDir, `user_${rec.userId}.webm`)}"`)
                    .join(" ");

                // FIX 1: proper separation with ;
                const videoInputs = recordings
                    .map((_, i) => `[${i}:v]scale=640:480[v${i}]`)
                    .join(";");

                // FIX 2: stacking inputs
                const stackedInputs = recordings
                    .map((_, i) => `[v${i}]`)
                    .join("");

                // FIX 3: audio inputs
                const audioInputs = recordings
                    .map((_, i) => `[${i}:a?]`)
                    .join("");

                // FIX 4: correct filter syntax
                const filterComplex = `${videoInputs};${stackedInputs}hstack=inputs=${recordings.length}[v];${audioInputs}amix=inputs=${recordings.length}:duration=longest[a]`;

                const outputPath = path.join(tempDir, "final-room.mp4");

                // FIX 5: proper execution + encoding
                await execAsync(
                    `ffmpeg ${inputs} -filter_complex "${filterComplex}" -map "[v]" -map "[a]" -c:v libx264 -preset slow -crf 18 -b:v 3M -maxrate 4M -bufsize 6M -c:a aac -b:a 192k "${outputPath}"`
                );

                
                //step 6: uplaoding final video to cloudflare r2
                const finalBuffer=fs.readFileSync(outputPath);

                const finalKey=`rooms/${roomId}/final-room.mp4`;

                await s3.send(
                    new PutObjectCommand({
                        Bucket:process.env.S3_BUCKET!,
                        Key:finalKey,
                        Body:finalBuffer,
                        ContentType:"video/mp4",
                    })
                );

                const publicBaseUrl = process.env.R2_PUBLIC_URL; 
                const finalUrl=`${publicBaseUrl}/${finalKey}`

                console.log("Final room video URL: ", finalUrl);


                //saving for each user in room
                await Promise.all(
                    recordings.map((rec)=>
                        prisma.roomRecording.upsert({
                            where:{
                                roomId_userId:{
                                    roomId,
                                    userId:rec.userId,
                                },
                            },
                            update:{
                                finalRoomUrl:finalUrl,
                            },
                            create:{
                                roomId,
                                userId:rec.userId,
                                finalRoomUrl:finalUrl,
                            },
                        })
                    )

                );


                console.log("Room Recordings saved for all users ");

            }
            catch(error){
                console.error("Room merge failed",error);

                throw error;
            }

            finally{
                 //cleanup always
                try{
                    //deleting temp directory and files
                    fs.rmSync(tempDir,{recursive:true,force:true});
                }
                catch(cleanupError){
                    console.error("Error during cleanup",cleanupError);
                }
            }

        }


    },
    {connection}
);


worker.on("completed", (job) => {
    console.log(`✅ Job completed: ${job.id} | name: ${job.name}`);
});

worker.on("failed", (job, err) => {
    console.error(`❌ Job failed: ${job?.id} | name: ${job?.name}`, err.message);
});

worker.on("active", (job) => {
    console.log(`🔄 Job started: ${job.id} | name: ${job.name}`);
});

worker.on("error", (err) => {
    console.error("Worker error:", err);
});

console.log("🚀 Recording worker started");