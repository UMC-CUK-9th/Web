

import { useRef, useState } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import ConfirmModal from "./ConfirmModal"; 
import { useDeleteAccountMutation } from "../hooks/mutations/useDeleteAccountMutation"; 
import { LogOut, User } from "lucide-react"; 
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {

  const sidebarRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(sidebarRef, onClose);

  const { accessToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { mutate: deleteAccountMutate, isPending } =
    useDeleteAccountMutation(); 

    const navigate = useNavigate();
    
  const handleDeleteAccount = () => {
    deleteAccountMutate();
    setIsModalOpen(false); 
  };

const handleGoToMyPage = () => {
    navigate("/my");
    onClose();
  };
  return (
    <>

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `} 
      >
        <div className="p-4 flex flex-col h-full">
          <div>
          <h2 className="text-xl font-bold mb-4">Menu</h2>

          {accessToken && (
              <button
                onClick={handleGoToMyPage}
                className="w-full flex items-center gap-2 p-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors mb-2"
              >
                <User size={16} />
                <span>마이페이지</span>
              </button>
            )}

            {accessToken && (
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isPending}
                className="w-full flex items-center gap-2 p-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                <span>탈퇴하기</span>
              </button>
            )}

          </div>

          <div className="mt-auto">

          </div>

          <button onClick={onClose} className="mt-4">
            Close
          </button>




        </div>
      </div>
      

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={onClose} 
        /> 
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAccount}
        isPending={isPending}
        title="회원 탈퇴"
        message="정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="탈퇴하기"
      />


    </>
  );
};

export default Sidebar;