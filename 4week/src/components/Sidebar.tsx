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

  // ⬇️ --- 여기에 ESC 키 로직 추가 --- ⬇️
  useEffect(() => {
    // 1. 키보드 이벤트 핸들러 정의
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(); // ESC 키가 눌리면 onClose 함수 호출
      }
    };

    if (isOpen) {
      // 기존 로직: body 스크롤 막기
      document.body.style.overflow = "hidden";
      // 2. (추가) 사이드바가 열렸을 때만 keydown 이벤트 리스너 등록
      document.addEventListener("keydown", handleKeyDown);
    } else {
      // 기존 로직: body 스크롤 활성화
      document.body.style.overflow = "auto";
    }

    // 3. [중요] 클린업(Cleanup) 함수
    return () => {
      // 기존 로직: 스크롤 원상 복구
      document.body.style.overflow = "auto";
      // (추가) 컴포넌트가 사라지거나, isOpen이 바뀔 때 리스너 제거
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]); // 4. onClose를 의존성 배열에 추가

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
        _       >
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