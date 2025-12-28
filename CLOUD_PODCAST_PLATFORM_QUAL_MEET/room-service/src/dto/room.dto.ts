import {z} from "zod";

export const CreateRoomSchema=z.object({
    maxParticipants:z.number().int().min(2).max(10).optional,
});


export type CreateRoomRequestDTO=z.infer<typeof CreateRoomSchema>;