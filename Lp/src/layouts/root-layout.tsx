import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import FloatingButton from "../components/floatingButton";
import { useState } from "react";

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="h-dvh flex flex-col relative">
      <Navbar setIsOpen={setIsOpen} />
      <div className="flex flex-1 min-h-0 bg-black">
        <Sidebar isSidebarOpen={isOpen} />
        <div
          className={`flex flex-1 overflow-y-auto bg-black ${
            isOpen ? "ml-60" : "ml-0"
          }`}
        >
          <Outlet />
        </div>
      </div>
      <FloatingButton />
    </div>
  );
};

export default RootLayout;
