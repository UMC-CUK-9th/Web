import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. AuthContext 임포트

// 2. HomeLayout에서 받는 toggleSidebar prop을 옵셔널(?)로 받도록 타입 정의
interface NavbarProps {
  toggleSidebar?: () => void;
}

// 3. (수정) 이전에 요청하셨던 48x48 햄버거 메뉴 아이콘 (24x24 크기로 표시)
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/>
  </svg>
);

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  // 4. AuthContext에서 'user' 객체를 추가로 가져옵니다.
  const { accessToken, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // (선택사항) 로그아웃 후 홈으로 리다이렉트가 필요하면 활성화
    // window.location.href = '/'; 
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gray-100 dark:bg-gray-900 shadow-md flex items-center justify-between px-4 sm:px-6 z-30">
      <div className="flex items-center">
        {/* 5. toggleSidebar prop이 있을 때만 햄버거 메뉴 표시 */}
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="text-gray-800 dark:text-white p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden" // md(태블릿) 이상에선 숨김
          >
            <MenuIcon />
          </button>
        )}
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white ml-2">
          MyWebsite
        </Link>
      </div>

      {/* 6. 인증 상태에 따른 조건부 렌더링 */}
      <div className="flex items-center space-x-2">
        {accessToken ? (
          // --- 7. 로그인 상태일 때 ---
          <div className="flex items-center space-x-4">
            
            {/* [!!!] 바로 이 부분입니다! (환영 메시지) */}
            <span className="text-gray-900 dark:text-white text-sm font-medium hidden sm:block">
              {user ? `${user.name || user.email}님 반갑습니다!` : '환영합니다!'}
            </span>
            
            {/* 9. 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              로그아웃
            </button>
          </div>
        ) : (
          // --- 로그아웃 상태일 때 ---
          <>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;