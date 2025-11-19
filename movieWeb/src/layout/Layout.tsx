import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../hooks/useSidebar";

const DESKTOP_QUERY = "(min-width: 1024px)";

const Layout = () => {
  const isDesktopNow = () => window.matchMedia(DESKTOP_QUERY).matches;
  const { isOpen, open, close, toggle } = useSidebar();

  // 반응형 처리: 초기 화면 크기
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
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

  // 로그인 상태 변경 감지
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
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      e.matches ? open() : close();
    };

    // 초기 화면 크기 반영
    setIsDesktop(mql.matches);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    mql.matches ? open() : close();

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [open, close]);

  // 모바일에서 사이드바 바깥 클릭 시 닫기
  const handleMainClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isDesktop && isOpen) {
      const target = e.target as Node;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        close();
      }
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        onToggle={toggle}
        onClose={close}
        sidebarRef={sidebarRef}
        onInnerClick={(e) => e.stopPropagation()}
      />

      {/* 모바일용 배경 오버레이 */}
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={close}
        />
      )}

      {/* 메인 컨텐츠 */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out`}
        style={{
          marginLeft: isDesktop && isOpen ? 256 : 0,
        }}
        onClick={handleMainClick}
      >
        <Navbar
          onToggleSidebar={toggle}
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
