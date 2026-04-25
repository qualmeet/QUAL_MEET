import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { Button } from "../ui/Button";
import { logoutUser } from "@/controllers/authController";
import type { AppDispatch } from "@/store";


export default function Navbar() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate();

  async function handleLogout(){
    await logoutUser(dispatch);
    navigate("/");
  }
  
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <nav className="relative z-10 flex justify-between items-center max-w-7xl mx-auto px-6 py-8 w-full">
      <Link to="/" className="text-2xl font-bold tracking-tighter italic text-white">
        QUAL<span className="text-gray-500 not-italic">MEET</span>
      </Link>

      {!isAuthenticated ? (
        <div className="flex gap-6 items-center">
          <Link to="/login" className="text-sm text-gray-400 hover:text-white">
            Sign In
          </Link>
          <Link to="/signup">
            <Button variant="primary" className="py-2 px-5 rounded-full">
              Join Now
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Button 
            type="button"
            variant="outline"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
