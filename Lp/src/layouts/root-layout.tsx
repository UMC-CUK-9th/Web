import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import FloatingButton from "../components/floatingButton";
import AddLpModal from "../components/AddLpModal";

const RootLayout = () => {
  return (
    <div className="h-dvh flex flex-col relative">
      <Navbar />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex flex-1 overflow-y-auto bg-black">
          <Outlet />
        </div>
      </div>
      <AddLpModal />
      <FloatingButton />
    </div>
  );
};

export default RootLayout;
