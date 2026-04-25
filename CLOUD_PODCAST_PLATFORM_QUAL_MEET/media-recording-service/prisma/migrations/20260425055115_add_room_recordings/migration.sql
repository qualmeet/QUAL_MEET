-- CreateTable
CREATE TABLE "room_recordings" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "finalRoomUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_recordings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "room_recordings_userId_idx" ON "room_recordings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "room_recordings_roomId_userId_key" ON "room_recordings"("roomId", "userId");
