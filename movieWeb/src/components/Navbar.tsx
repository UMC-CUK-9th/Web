import { NavLink, useNavigate } from "react-router-dom";
import { useAuthMutations } from "../hooks/useAuthMutations";

interface NavbarProps {
  onToggleSidebar: () => void;
  userName: string | null;
  isLoggedIn: boolean;
}

const Navbar = ({ onToggleSidebar, userName, isLoggedIn }: NavbarProps) => {
  const navigate = useNavigate();
  const { logoutMutation } = useAuthMutations();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        alert("로그아웃 되었습니다.");
        navigate("/", { replace: true });
      },
      onError: () => {
        alert("로그아웃 처리 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex justify-between items-center px-4 py-3">
      {/* 왼쪽: 버거 + 메뉴 */}
      <div className="flex items-center gap-6">
        <button
          onClick={onToggleSidebar}
          className="p-1 rounded hover:bg-gray-100"
        >
          <svg width="28" height="28" viewBox="0 0 48 48">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M7.95 11.95h32m-32 12h32m-32 12h32"
            />
          </svg>
        </button>

        <ul className="hidden md:flex gap-6 text-gray-400">
          <li><NavLink to="/" end>홈</NavLink></li>
          <li><NavLink to="/popular">인기 영화</NavLink></li>
          <li><NavLink to="/now_playing">상영 중</NavLink></li>
          <li><NavLink to="/top_rated">평점 높은</NavLink></li>
          <li><NavLink to="/upcoming">개봉 예정</NavLink></li>
          <li><NavLink to="/lplist">LP</NavLink></li>
        </ul>
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-4">
        {isLoggedIn && userName && (
          <span className="text-sm text-gray-600">{userName}님 반갑습니다</span>
        )}

        {isLoggedIn ? (
          <>
            {/* 🔥 여기서 실제 로그아웃 */}
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="px-4 py-2 text-sm text-gray-700 hover:text-green-500 transition"
            >
              {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
            </button>

            <NavLink
              to="/mypage"
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition"
            >
              마이페이지
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="px-4 py-2 text-sm text-gray-700 hover:text-green-500 transition"
            >
              로그인
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition"
            >
              회원가입
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
