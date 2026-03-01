
import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from "react";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../../components/ui/sheet";
import { BookOpen, ChartNoAxesCombined, DollarSign, Home, Info, ListOrdered, Phone, Users } from 'lucide-react';


const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <Home />, // more appropriate icon
  },
  {
    id: "courses",
    label: "Courses",
    path: "/admin/courses",
    icon: <BookOpen />,
  },
  {
    id: "about-us",
    label: "About Us",
    path: "/admin/about-us",
    icon: <Info />,
  },
  {
    id: "contact-us",
    label: "Contact Us",
    path: "/admin/contact-us",
    icon: <Phone />,
  },
  {
    id: "pricing",
    label: "Pricing",
    path: "/admin/pricing",
    icon: <DollarSign />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ListOrdered />,
  },
  {
    id: "users",
    label: "Users",
    path: "/admin/users",
    icon: <Users />,
  },
];


function MenuItems({ setOpen }) {
  const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? "bg-gray-200" : "";
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className={`flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-gray-200 hover:text-foreground ${isActive(menuItem.path)}`}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}


const Sidebar = ({open,setOpen}) => {
    const navigate = useNavigate();
  
    return (
      <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full bg-white">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r border-gray-300 bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
    )
  
}

export default Sidebar
