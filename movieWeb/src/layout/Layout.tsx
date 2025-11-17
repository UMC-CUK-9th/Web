import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DESKTOP_QUERY = "(min-width: 1024px)";

const Layout = () => {
  const isDesktopNow = () => window.matchMedia(DESKTOP_QUERY).matches;

  // 화면 크기 기반 초기값 설정
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? isDesktopNow() : true
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() =>
    typeof window !== "undefined" ? isDesktopNow() : true
  );

  // 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("accessToken");
  });

  const [userName, setUserName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("userName");
  });

  const sidebarRef = useRef<HTMLDivElement>(null);

  // 로그인 상태 변경 이벤트 처리
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

  // 반응형 처리
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);

    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      setIsSidebarOpen(e.matches);
    };

    setIsDesktop(mql.matches);
    setIsSidebarOpen(mql.matches);

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // 모바일에서 사이드바 바깥 클릭 시 닫기
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
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((v) => !v)}
        sidebarRef={sidebarRef}
        onInnerClick={(e) => e.stopPropagation()}
      />

      {!isDesktop && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`flex-1 transition-all duration-300 ease-in-out`}
        style={{
          marginLeft: isDesktop && isSidebarOpen ? 256 : 0,
        }}
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
