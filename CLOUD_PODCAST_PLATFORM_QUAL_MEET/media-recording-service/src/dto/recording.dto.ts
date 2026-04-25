export interface InitRecordingRequestDTO{
    roomId:string;
}

export interface UploadUrlRequestDTO{
    sessionId:string;
    chunkIndex:number;
}

export interface ChunkCompleteRequestDTO{
    sessionId:string;
    chunkIndex:number;
}

export interface CompleteRecordingRequestDTO{
    sessionId:string;
}