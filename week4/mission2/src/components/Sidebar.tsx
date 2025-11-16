import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import useDeleteUsers from "../hooks/mutations/useDeleteUsers";
import { Modal } from "./Modal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { accessToken } = useAuth();


  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const { mutate: deleteUserMutate } = useDeleteUsers();

  const handleDeleteUser = () => {
    deleteUserMutate();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* 뒤에 흐림 효과 + 클릭시 닫기 */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* 사이드바 */}
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

            {/* 비로그인 */}
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

            {/* 로그인된 경우 */}
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

                
                <button
                  onClick={() => setIsDeleteUserOpen(true)}
                  className="mt-auto text-gray-400 hover:text-red-400"
                >
                  탈퇴하기
                </button>

              
                <Modal
                  isOpen={isDeleteUserOpen}
                  onClose={() => setIsDeleteUserOpen(false)}
                >
                  <div className="flex flex-col gap-5 p-4 justify-center items-center">
                    <h3 className="font-bold text-center text-xl">
                      정말 탈퇴하시겠습니까?
                    </h3>

                    <div className="flex gap-5 w-full">
                      <button
                        onClick={handleDeleteUser}
                        className="flex-1 border-2 border-fuchsia-50 rounded-2xl cursor-pointer font-semibold"
                      >
                        예
                      </button>

                      <button
                        onClick={() => setIsDeleteUserOpen(false)}
                        className="flex-1 border-2 border-fuchsia-50 rounded-2xl cursor-pointer font-semibold"
                      >
                        아니오
                      </button>
                    </div>
                  </div>
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
