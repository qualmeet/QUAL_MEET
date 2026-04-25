import { useDispatch } from "react-redux";
import { clearUser } from "@/store/authSlice";
import type { AppDispatch } from "@/store";
import { logoutUser } from "@/controllers/authController";

export default function AppLayout({ children }: { children: React.ReactNode }) {

  const dispatch = useDispatch<AppDispatch>();
  
  async function handleLogout(){
    await logoutUser(dispatch);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">QualMeet App</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="flex-1 p-6 bg-[#050505]">
        {children}
      </main>
    </div>
  );
}
