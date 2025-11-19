// src/components/Navbar.tsx

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import Sidebar from "./Sidebar"; // Sidebar는 HomeLayout에서 관리하므로 여기서 직접 호출할 필요가 없습니다.
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";
import { QUERY_KEY } from "../constants/key";
import { Menu } from "lucide-react"; // 햄버거 메뉴 아이콘 임포트

// HomeLayout에서 프롭스를 받아옵니다.
interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: () => void;
}

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  const { data: userInfo } = useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-baseline gap-5 p-4">
        
        {/* [추가] 햄버거 버튼 */}
        <button
          onClick={setIsSidebarOpen} // HomeLayout의 toggleSidebar 함수 실행
          className="text-gray-900 dark:text-white p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Menu size={24} />
        </button>

        {/* Sidebar 컴포넌트는 HomeLayout에서 렌더링하므로 여기서 제거합니다. */}
        {/* <Sidebar /> */} 

        <Link
          to="/"
          className="cursor-pointer text-2xl font-bold text-gray-900 dark:text-white"
        >
          SpinSpin 돌륌퐌~~
        </Link>
      </div>

      {/* ... (기존 우측 메뉴 코드 동일) ... */}
      {accessToken ? (
        <div className="space-x-6 mr-5 flex justify-center items-center">
          <Link
            to="/search"
            className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            검색
          </Link>
          <div className="text-gray-900 dark:text-white">
            {userInfo?.data?.name}님 환영합니다
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="space-x-6 mr-5">
          <Link
            to="/login"
            className="cursor-pointer text-base text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="cursor-pointer text-base text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            회원가입
          </Link>
        </div>
      )}
    </nav>
  );
}