

import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh bg-slate-50 font-sans">

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />


      <div className="flex-1 flex flex-col overflow-hidden">
        

        <Header onMenuClick={() => setSidebarOpen(true)} />

     
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>


        <footer className="p-6 text-center text-sm text-gray-500 bg-slate-100 border-t border-slate-200">
          푸터
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;