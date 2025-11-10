import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DESKTOP_QUERY = "(min-width: 1024px)"; // Tailwind lg 기준

const Layout = () => {
  const isDesktopNow = () => window.matchMedia(DESKTOP_QUERY).matches;

  // 데스크탑은 기본 열림, 모바일은 기본 닫힘
  const [isDesktop, setIsDesktop] = useState<boolean>(() => typeof window !== "undefined" ? isDesktopNow() : true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => (typeof window !== "undefined" ? isDesktopNow() : true));

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("accessToken"));
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));

  const sidebarRef = useRef<HTMLDivElement>(null);

  // 로그인 상태 동기화
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

  // 반응형: 화면 크기 변경에 따라 사이드바 기본 상태 갱신
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      setIsSidebarOpen(e.matches); // 데스크탑이면 열림, 모바일이면 닫힘
    };
    // 초기화(사파리 대응)
    setIsDesktop(mql.matches);
    setIsSidebarOpen(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // 페이지 어디든 클릭 시(모바일일 때만) 사이드바 외부 클릭 감지 -> 닫기
  const handleMainClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isDesktop && isSidebarOpen) {
      const target = e.target as Node;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        setIsSidebarOpen(false);
      }
    }
  };

  return (
    <div className="flex">
      {/* 사이드바: 모바일에서는 오버레이 위에 뜨는 패널, 데스크탑에서는 고정 폭 */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((v) => !v)}
        sidebarRef={sidebarRef}
        // 사이드바 내부 클릭은 버블링 방지 (외부 클릭으로 오인 방지)
        onInnerClick={(e) => e.stopPropagation()}
      />

      {/* 모바일에서 사이드바가 열려있을 때만 오버레이 표시 (클릭시 닫힘) */}
      {!isDesktop && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 콘텐츠: 데스크탑에서만 밀기(ml-64). 모바일은 오버레이 팝오버이므로 밀지 않음 */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out`}
        style={{ marginLeft: isDesktop && isSidebarOpen ? 256 : 0 }} // 64 * 4 = 256px
        onClick={handleMainClick}
      >
        <Navbar
          onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
          userName={userName}
          isLoggedIn={isLoggedIn}
        />

        <main className="mt-16 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
