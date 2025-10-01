import { useEffect, useState } from "react";

const routes: Record<string, React.ReactNode> = {
  "/": <h1 className="text-3xl font-bold">🏠 홈 화면</h1>,
  "/about": <h1 className="text-3xl font-bold">ℹ️ 소개 화면</h1>,
  "/contact": <h1 className="text-3xl font-bold">📞 연락처 화면</h1>,
};

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* 네비게이션 바 */}
      <nav className="bg-indigo-600 text-white py-4 shadow-md">
        <div className="flex justify-center gap-6">
          <button
            className={`hover:text-yellow-300 transition ${
              path === "/" ? "font-bold underline" : ""
            }`}
            onClick={() => navigate("/")}
          >
            홈
          </button>
          <button
            className={`hover:text-yellow-300 transition ${
              path === "/about" ? "font-bold underline" : ""
            }`}
            onClick={() => navigate("/about")}
          >
            소개
          </button>
          <button
            className={`hover:text-yellow-300 transition ${
              path === "/contact" ? "font-bold underline" : ""
            }`}
            onClick={() => navigate("/contact")}
          >
            연락처
          </button>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="flex-grow flex items-center justify-center text-gray-800">
        {routes[path] || <h1 className="text-3xl font-bold">404 Not Found</h1>}
      </main>
    </div>
  );
}

export default App;
