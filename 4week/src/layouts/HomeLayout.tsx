import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

// 플로팅 버튼 아이콘
const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-dvh flex flex-col bg-gray-100 dark:bg-gray-500">
      {/* 상단 Navbar + 환영문구 */}
      <div className="fixed top-0 left-0 w-full z-40 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-4 sm:px-6 h-16">
        {/* 햄버거 버튼 / 로고 포함된 Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* 오른쪽: 환영문구 + 로그아웃 버튼 */}
        <div className="flex items-center gap-4">
          <span className="text-gray-800 dark:text-gray-200 font-medium hidden sm:block">
            환영합니다!!
          </span>
          <button
            onClick={() => {
              // 로그아웃 처리 (추후 로직 연결)
              console.log("로그아웃됨");
            }}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="flex flex-1 pt-16 relative">
        {/* 사이드바 */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            sm:relative sm:translate-x-0 sm:block`}
        />

        {/* 메인 콘텐츠 */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* 플로팅 버튼 (사이드바 열릴 때 숨김) */}
      {!isSidebarOpen && (
        <Link
          to="/lp/create"
          className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-20"
          title="새 LP 등록"
        >
          <PlusIcon />
        </Link>
      )}

      <Footer />
    </div>
  );
};

export default HomeLayout;
