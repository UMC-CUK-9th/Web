import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
