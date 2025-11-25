import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";
import { Modal } from "../components/Modal";
import LpAdd from "../components/LpAdd";
import { useEffect, useState } from "react";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  return (
    <div className="h-dvh flex flex-col">

      {/* 네비 */}
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={toggleSidebar} />

      <div className="flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main
          className={`pt-20 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "pl-[250px]" : "pl-0"
          }`}
        >
          <Outlet />
        </main>
      </div>

  
      <Footer />


      <FloatingButton onClick={() => setIsModalOpen(true)} />

      {/* ⭐ LP 추가 모달은 layout에서 띄워야 안전함 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LpAdd isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default HomeLayout;