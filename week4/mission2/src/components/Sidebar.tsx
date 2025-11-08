import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { accessToken } = useAuth();

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

        
        <div
          className={`absolute top-0 left-0 h-full w-[250px] bg-[#ffffff] text-gray-700 shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col p-5 space-y-6 mt-10">
            <button
              onClick={onClose}
              className="self-end bg-gray-200 text-gray-700 rounded-md px-2 py-1 text-sm font-semibold hover:bg-gray-300"
            >
              ✕
            </button>

            {!accessToken && (
              <>
                <Link to="/login" className="hover:text-pink-400">
                  로그인
                </Link>
                <Link to="/signup" className="hover:text-pink-400">
                  회원가입
                </Link>
              </>
            )}

            {accessToken && (
              <>
                <Link
                  to="/search"
                  className="hover:text-pink-400 flex items-center gap-2"
                >
                  찾기
                </Link>
                <Link
                  to="/my"
                  className="hover:text-pink-400 flex items-center gap-2"
                >
                  마이페이지
                </Link>
                <Link
                  to="#"
                  className="mt-auto text-gray-400 hover:text-red-400"
                >
                  탈퇴하기
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
