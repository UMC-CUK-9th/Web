import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const Header = () => {
  const navigate = useNavigate();
  const { getItem, removeItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const isLoggedIn = !!getItem();

  const handleLogout = () => {
    removeItem();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <header className="w-full bg-white/80 shadow-md fixed top-0 left-0 flex justify-between items-center px-8 py-3 z-50 backdrop-blur-sm">
      <h1
        className="text-2xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-500 transition-colors"
        onClick={() => navigate("/")}
      >
        Home
      </h1>
      <nav className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/mypage")}
              className="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              마이페이지
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              회원가입
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;