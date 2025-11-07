import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RefObject, MouseEventHandler } from "react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
  onInnerClick?: MouseEventHandler<HTMLDivElement>;
}

const Sidebar = ({ isOpen, onToggle, sidebarRef, onInnerClick }: SidebarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("accessToken"));
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
      setUserName(localStorage.getItem("userName"));
    };
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("authChange", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  return (
    <aside
      ref={sidebarRef}
      onClick={onInnerClick}
      className={`fixed top-0 left-0 h-full bg-white shadow-md z-40 transition-transform duration-300 ease-in-out w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold text-gray-700">메뉴</h2>
        <button className="text-gray-500 hover:text-gray-700 text-xl" onClick={onToggle}>
          ✕
        </button>
      </div>

      <nav className="flex flex-col p-4 gap-3">
        <NavLink to="/" className="hover:text-green-500">홈</NavLink>
        <NavLink to="/popular" className="hover:text-green-500">인기 영화</NavLink>
        <NavLink to="/now_playing" className="hover:text-green-500">상영 중</NavLink>
        <NavLink to="/top_rated" className="hover:text-green-500">평점 높은</NavLink>
        <NavLink to="/upcoming" className="hover:text-green-500">개봉 예정</NavLink>
        <NavLink to="/lplist" className="hover:text-green-500">LP</NavLink>

        <hr className="my-3" />

        {isLoggedIn ? (
          <>
            <p className="text-gray-700 mb-2">{userName}님 반갑습니다</p>
            <NavLink to="/mypage" className="hover:text-green-500">마이페이지</NavLink>
            <NavLink to="/logout" className="hover:text-green-500">로그아웃</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hover:text-green-500">로그인</NavLink>
            <NavLink to="/signup" className="hover:text-green-500">회원가입</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
