import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import FloatingButton from "../components/floatingButton";

const RootLayout = () => {
  return (
    <div className="h-dvh flex flex-col relative">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1">
          <Outlet />
        </div>
      </div>
      <FloatingButton />
    </div>
  );
};

export default RootLayout;
