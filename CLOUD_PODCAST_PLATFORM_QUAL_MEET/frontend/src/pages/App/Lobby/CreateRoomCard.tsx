import { useNavigate } from "react-router-dom";
import { createRoom } from "@/api/rooms";

export default function CreateRoomCard(){

    const navigate=useNavigate();

    async function handleCreate(){
        try{
            const {roomId}=await createRoom();
            console.log("Room created , roomId : ",roomId);
            navigate(`/app/room/${roomId}`);
        }
        catch(error){
            console.error("Failed to create room",error);
        }
    }

    return (
    <div className="h-full flex flex-col justify-between p-8">
        <div>
            <span className="text-xs font-mono text-green-500 tracking-widest uppercase"> Start</span>
            <h3 className="text-3xl font-bold mt-2">New Room</h3>
            <p className="text-gray-500 mt-4 text-sm leading-relaxed">
            Initiate a secure, end-to-end encrypted session with cloud recording enabled.
            </p>
        </div>
        <button onClick={handleCreate} className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:invert transition-all">
            Generate Room
        </button>
</div>
  );
}