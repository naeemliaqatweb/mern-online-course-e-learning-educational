import React, { Fragment } from "react";
import headerIcon from "/logo.png";
import { Link, useLocation , useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import testimonial1 from "/images/HomeTestimonials/testimonial1.png";

const Header = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? "bg-[#F1F1F3]" : "";

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      await dispatch(logoutUser());
      navigate('/login'); // go to login after logout
    };
    return (
        <Fragment>
            <header className=" w-full z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-gray-200">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold">
                        <img src={headerIcon} alt="Logo" className="h-10 w-auto" />
                    </Link>

                    {/* Desktop & Tablet Navigation (Always Visible) */}
                    <nav className="hidden md:flex lg:block space-x-6">
                        <Link
                            to="/"
                            className={`px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3] ${isActive("/")}`}>
                            Home
                        </Link>
                        <Link
                            to="/courses"
                            className={`px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3] ${isActive("/courses")}`}>
                            Courses
                        </Link>
                        <Link
                            to="/about"
                            className={`px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3] ${isActive("/about")}`}>
                            About Us
                        </Link>
                        <Link
                            to="/pricing"
                            className={`px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3] ${isActive("/pricing")}`}>
                            Pricing
                        </Link>
                        <Link
                            to="/contact"
                            className={`px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3] ${isActive("/contact")}`}>
                            Contact Us
                        </Link>
                    </nav>

                    {/* Right-side buttons (ONLY for Desktop & Tablet) */}
                    {/* <div className=" md:flex space-x-4">

                        <Button asChild className="px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3]">
                            <Link to="/signup">Sign Up</Link>
                        </Button>
                        <Button className="bg-orange-400 text-white" asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                    </div> */}
                    {!isAuthenticated ? (
                            <>
                          <div className=" md:flex space-x-4">

                            <Button asChild className="px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3]">
                                <Link to="/signup">Sign Up</Link>
                            </Button>
                            <Button className="bg-orange-400 text-white" asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                            </div>
                            </>
                        ) : (
                            <>
                            <div className="flex">
                            <DropdownMenu className="bg-white px-3 py-2 rounded-md">
                                <DropdownMenuTrigger asChild className="bg-white px-3 py-2 rounded-md">
                                    <Button variant="ghost" className="flex items-center gap-2 px-3 bg-white cursor-pointer">
                                    <img
                                        src={user.profilePicture || testimonial1}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="font-medium">{user.name}</span>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-300 shadow">
                                    <DropdownMenuLabel>Hello, {user.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate("/my-account")} className="hover:bg-gray-200 cursor-pointer">
                                    My Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-red-600 focus:text-red-600  hover:bg-gray-200 cursor-pointer"
                                    >
                                    Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {/* <span className="px-3 py-3">Hello, {user.name}</span>
                            <button
                                className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer"
                                onClick={handleLogout} 
                            >
                                Logout
                            </button> */}
                            {
                            user.role == 'admin' ? 
                             (   <>
                            <Link
                            to="/admin/dashboard"
                            className={`ms-5 rounded-md bg-amber-500 text-white text-sm px-3 py-2  cursor-pointer`}>
                            Dashboard
                        </Link>
                                </>) : ''
                            
                        }
                            </div>
                            </>
                        )}
                       
                    {/* Mobile Menu (ONLY on Small Screens) */}
                    <div className="flex md:hidden">
                        <Sheet>
                            <SheetTrigger>
                                <Menu className="w-6 h-6" />
                            </SheetTrigger>

                            {/* Mobile Menu Popup */}
                            <SheetContent side="right" className="w-64 bg-white p-6 shadow-lg">
                                {/* Accessible Dialog Title */}
                                <DialogTitle className="sr-only">Navigation Menu</DialogTitle>

                                {/* Navigation Links */}
                                <nav className="flex flex-col space-y-4 mt-4">
                                    <Link to="/" className="text-2xl font-bold text-blue-600">
                                        <img src={headerIcon} alt="Logo" className="h-10 w-auto" />
                                    </Link>

                                    <Link
                                        to="/"
                                        className={`px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3] ${isActive("/contact")}`}>
                                        Home
                                    </Link>
                                    <Link
                                        to="/courses"
                                        className={`px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3] ${isActive("/courses")}`}>
                                        Courses
                                    </Link>
                                    <Link
                                        to="/about"
                                        className={`px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3] ${isActive("/about")}`}>
                                        About Us
                                    </Link>
                                    <Link
                                        to="/pricing"
                                        className={`px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3] ${isActive("/pricing")}`}>
                                        Pricing
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className={`px-3 py-3 rounded-md transition-colors hover:bg-[#F1F1F3] ${isActive("/contact")}`}>
                                        Contact Us
                                    </Link>
                                </nav>

                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </Fragment>
    );
};

export default Header;
