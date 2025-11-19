import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RefObject, MouseEventHandler } from "react";
import { useAuthMutations } from "../hooks/useAuthMutations";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
  onInnerClick?: MouseEventHandler<HTMLDivElement>;
}

const Sidebar = ({ isOpen, onClose, sidebarRef, onInnerClick }: SidebarProps) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("accessToken");
  });
  const [userName, setUserName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("userName");
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();
  const { deleteAccountMutation } = useAuthMutations();

  useEffect(() => { //로그인상태변경 감지
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


useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  window.addEventListener("keydown", handleEsc);
  return () => window.removeEventListener("keydown", handleEsc);
}, [onClose]);


  useEffect(() => { //배경 스크롤 방지
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleConfirmDelete = () => {
    deleteAccountMutation.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
        window.dispatchEvent(new Event("authChange"));

        setShowDeleteModal(false);
        onClose(); 
        alert("회원탈퇴가 완료되었습니다.");
        navigate("/login", { replace: true });
      },
      onError: () => {
        alert("회원탈퇴 실패. 다시 시도해주세요.");
      },
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        onClick={onInnerClick}
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-40 transition-transform duration-300 ease-in-out w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-gray-700">메뉴</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-3">
          <NavLink to="/" className="hover:text-green-500">홈</NavLink>
          <NavLink to="/popular" className="hover:text-green-500">인기 영화</NavLink>
          <NavLink to="/now_playing" className="hover:text-green-500">상영 중</NavLink>
          <NavLink to="/top_rated" className="hover:text-green-500">평점 높은</NavLink>
          <NavLink to="/upcoming" className="hover:text-green-500">개봉 예정</NavLink>
          <NavLink to="/lplist" className="hover:text-green-500">LP</NavLink>

          <hr className="my-3" />

          {isLoggedIn ? (
            <>
              <p className="text-gray-700 mb-2">{userName}님 반갑습니다</p>
              <NavLink to="/mypage" className="hover:text-green-500">마이페이지</NavLink>
              <NavLink to="/logout" className="hover:text-green-500">로그아웃</NavLink>

              {/* 탈퇴하기 버튼 */}
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="mt-2 text-sm text-red-500 hover:text-red-600 text-left"
              >
                탈퇴하기
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-green-500">로그인</NavLink>
              <NavLink to="/signup" className="hover:text-green-500">회원가입</NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* 탈퇴 모달 */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-80 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-3">정말 탈퇴하시겠습니까?</h3>
            <p className="text-sm text-gray-600 mb-5">
              탈퇴 후에는 계정을 복구할 수 없습니다.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                취소
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleteAccountMutation.isPending}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300"
              >
                {deleteAccountMutation.isPending ? "탈퇴 중..." : "예, 탈퇴할게요"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
