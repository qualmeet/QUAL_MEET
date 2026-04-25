-- CreateEnum
CREATE TYPE "RecordingStatus" AS ENUM ('RECORDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "recordings" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "RecordingStatus" NOT NULL DEFAULT 'RECORDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finalUrl" TEXT,

    CONSTRAINT "recordings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recording_chunks" (
    "id" TEXT NOT NULL,
    "recordingId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "uploaded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "recording_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recording_chunks_recordingId_chunkIndex_key" ON "recording_chunks"("recordingId", "chunkIndex");

-- AddForeignKey
ALTER TABLE "recording_chunks" ADD CONSTRAINT "recording_chunks_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "recordings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
