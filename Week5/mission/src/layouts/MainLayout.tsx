import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState, useRef, useLayoutEffect } from "react";
import { Plus } from "lucide-react"; 
import { useAuth } from "../hooks/useAuth"; 
import LpCreateModal from "../components/Lp/LpCreateModal"; 
import { useSidebar } from "../hooks/useSidebar";

const MainLayout = () => {
  const { isOpen, close, toggle } = useSidebar();


  const [isLpCreateModalOpen, setIsLpCreateModalOpen] = useState(false);
  

  const { accessToken } = useAuth();

  const { pathname } = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

 useLayoutEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="flex h-dvh bg-slate-50 font-sans">

      <Sidebar 
        isOpen={isOpen} 
        onClose={close} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        

        <Header onMenuClick={toggle} />

     
        <main 
          ref={mainRef}
          style={{ overflowAnchor: 'none' }}
          className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 relative "
        >
          <Outlet />

    


        </main>


        <footer className="p-6 text-center text-sm text-gray-500 bg-slate-100 border-t border-slate-200">
          푸터
        </footer>
      </div>
      {accessToken && (
        <button
          onClick={() => setIsLpCreateModalOpen(true)}
          className="fixed bottom-8 right-8 z-30
                     w-16 h-16 bg-indigo-600 rounded-full
                     flex items-center justify-center text-white
                     shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
          aria-label="새 LP 등록"
        >
          <Plus size={32} />
        </button>
      )}

      <LpCreateModal 
        isOpen={isLpCreateModalOpen} 
        onClose={() => setIsLpCreateModalOpen(false)} 
      />


    </div>
  );
};

export default MainLayout;