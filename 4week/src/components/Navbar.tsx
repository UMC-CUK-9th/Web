// src/components/Navbar.tsx

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar"; // Sidebar 컴포넌트가 있다고 가정
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";
import { QUERY_KEY } from "../constants/key"; // QUERY_KEY 사용

export default function Navbar() {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  // React Query를 사용하여 내 정보 가져오기 (캐싱 적용)
  const { data: userInfo } = useQuery({
    queryKey: [QUERY_KEY.myInfo], // "myInfo" 키 사용
    queryFn: getMyInfo,
    enabled: !!accessToken, // accessToken이 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-baseline gap-5 p-4">
        <Sidebar />
        <Link
          to="/"
          className="cursor-pointer text-2xl font-bold text-gray-900 dark:text-white"
        >
          SpinSpin 돌륌퐌~~
        </Link>
      </div>
      {accessToken ? (
        <div className="space-x-6 mr-5 flex justify-center items-center">
          {/* [추가] 검색 페이지 링크 */}
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