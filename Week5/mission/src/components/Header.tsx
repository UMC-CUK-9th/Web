
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLogoutMutation } from "../hooks/mutations/useLogoutMutation";
import { User } from 'lucide-react';


interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  const isLoggedIn = !!accessToken;

  const { mutate: logoutMutate, isPending } = useLogoutMutation();

  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <header className="w-full bg-white/80 shadow-md sticky top-0 left-0 flex justify-between items-center px-4 md:px-8 py-3 z-10 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        

        <button
          onClick={onMenuClick}
          className="p-1 text-gray-600 hover:text-indigo-600" 
          aria-label="Open menu"
        >

          <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/></svg>
        </button>
        

        <h1
          className="text-2xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-500 transition-colors"
          onClick={() => navigate("/")}
        >
          Home
        </h1>
      </div>


      <nav className="flex items-center gap-3 md:gap-4">
        {isLoggedIn ? (

          user ? (

            <>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold  text-indigo-600">
  <User size={16} className="text-indigo-500" />
  Hello {user.name}
</span>
              <button
                onClick={() => navigate("/my")}
                className="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                마이페이지
              </button>
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="px-3 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (

            <div className="flex items-center gap-3">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          )
        ) : (

          <>
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-3 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
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