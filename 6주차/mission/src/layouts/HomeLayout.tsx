import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import LpModal from "../components/LpModal";
import ConfirmModal from "../components/ConfimModal";
import { useLogout } from "../hooks/mutations/useLogout";

const HomeLayout = () => {
  const { accessToken, user } = useAuth();
  const {mutate} = useLogout();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleLogout = () => {
    mutate();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 헤더 */}
      <header className="flex justify-between items-center p-4 border-b bg-white shadow-sm flex-shrink-0 z-40">
        <div className="flex items-center gap-4">
          {/* 버거 버튼*/}
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="cursor-pointer"
            aria-label="사이드바 열기"
          >
            <svg width="32" height="32" viewBox="0 0 48 48">
              <path
                fill="none"
                stroke="gray"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>
          <Link
            to="/"
            className="px-4 py-2 font-bold text-gray-800 text-xl"
          >
            기여운 고양이
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!accessToken && (
            <>
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300 font-semibold"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="hidden md:block px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300 font-semibold"
              >
                회원가입
              </Link>
            </>
          )}
          {accessToken && (
            <>
              <span className="font-semibold px-4 py-2 bg-gray-100 rounded text-gray-800">
                {user?.name}님 반갑습니다!
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300 font-semibold cursor-pointer"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 사이드바 */}
        <aside
          className={`
            flex flex-col justify-between w-56 p-6
            bg-white border-r shadow-sm
            transition-transform duration-300
            fixed inset-y-0 left-0 h-full z-50
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:relative md:translate-x-0 md:flex-shrink-0 md:h-auto md:z-0 md:inset-auto md:left-auto
          `}
        >
          <div>
            <nav className="flex flex-col space-y-5 mt-7 ml-3 font-semibold">
              <Link
                to={"/"}
                className="hover:text-blue-500 transition-all duration-200 text-gray-700"
              >
                찾기
              </Link>
              <Link
                to={"/my"}
                className="hover:text-blue-500 transition-all duration-200 text-gray-700"
              >
                마이페이지
              </Link>
            </nav>
          </div>
          <Link to={"/"}
          className="ml-3 text-gray-400 hover:text-red-400">
            탈퇴하기
          </Link>
        </aside>

        {/* 메인 */}
        <main className="flex-1 overflow-y-auto p-8 bg-white">
          <Outlet />
        </main>
      </div>

      {/* 오버레이: 모바일에서 사이드바 열렸을 때만 보임 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 플로팅 + 버튼 */}
      <div className="fixed bottom-8 right-8 z-30">
        <button className="bg-blue-500 hover:bg-blue-400 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg cursor-pointer"
        onClick={() => setIsModalOpen(true)}>
          <span className="text-3xl font-light pb-1">+</span>
        </button>
      </div>

       <LpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
       <ConfirmModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}/>
    </div>
  );
};

export default HomeLayout;