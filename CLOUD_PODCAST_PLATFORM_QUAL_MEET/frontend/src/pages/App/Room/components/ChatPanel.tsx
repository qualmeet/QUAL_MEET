import { useState, useRef, useEffect} from "react";
import { Socket } from "socket.io-client";


export interface ChatMessage{
    id:string;
    senderId:string;
    fullName:string;
    content:string;
    createdAt:string;
    isOwn?:boolean;
}

interface ChatPanelProps{
    messages:ChatMessage[];
    setMessages:React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    currentUserId:string;
    socket:Socket | null;
}

export  function ChatPanel({messages,setMessages,currentUserId,socket}: ChatPanelProps){
    
    const [input,setInput]=useState("");
    const bottomRef=useRef<HTMLDivElement>(null);

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages]);

    function sendMessage(){
        const content=input.trim();

        if(!content || !socket)
            return;

        //local message
        const localMessage:ChatMessage={
            id:crypto.randomUUID(),
            senderId:currentUserId,
            fullName:"YOU",
            content,
            createdAt:new Date().toISOString(),
            isOwn:true
        };


        setMessages(prev =>[...prev, localMessage]);

        socket.emit("chat_message",{content});

        setInput("");
    }

    
    return (
    <div className="flex flex-col h-full bg-[#050505]">
      {/* messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isOwn ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-2 mb-1.5 px-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                {msg.isOwn ? "Me" : msg.fullName}
              </span>
              <span className="text-[9px] font-mono text-gray-700">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div
              className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] break-words leading-relaxed shadow-sm transition-all ${
                msg.isOwn
                  ? "bg-white text-black font-medium rounded-tr-none"
                  : "bg-[#0A0A0A] text-gray-200 border border-white/5 rounded-tl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* input area */}
      <div className="p-4 border-t border-white/5 bg-[#050505]">
        <div className="relative flex items-center gap-2 bg-[#0A0A0A] border border-white/10 rounded-2xl p-1.5 focus-within:border-white/20 transition-all">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 font-medium"
            placeholder="Signals..."
          />
          <button
            onClick={sendMessage}
            className="px-5 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}