import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../../../components//ui/button";
import { Link, useLocation , useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { logoutUser } from "@/store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../features/auth/authSlice";
const Header = ({setOpen}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login'); // go to login after logout
  };
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b border-gray-300">
    <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
      <AlignJustify />
      <span className="sr-only">Toggle Menu</span>
    </Button>
    <div className="flex flex-1 justify-end">
    <Button
        onClick={() => navigate('/home')}
        className="inline-flex gap-2 items-center bg-amber-500  rounded-md px-4 me-3 py-2 text-sm font-medium shadow cursor-pointer"
      >
        Home
      </Button>
      <Button
        onClick={handleLogout}
        className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow cursor-pointer"
      >
        <LogOut />
        Logout
      </Button>
    </div>
  </header>
  )
}

export default Header
