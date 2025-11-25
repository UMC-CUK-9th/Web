import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

interface prop {
  isSidebarOpen: boolean;
}
const Sidebar = ({ isSidebarOpen }: prop) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed left-0 h-full bg-[#252525ff] w-60 p-5 text-center text-white flex flex-col justify-between
      transition-transform duration-300
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="pl-5">
        <div className="flex items-center gap-2 mb-3 cursor-pointer">
          <FaSearch />
          찾기
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/my")}
        >
          <FaUser />
          마이페이지
        </div>
      </div>
      <button
        className="flex w-full justify-center"
        onClick={() => setIsOpen(true)}
      >
        탈퇴하기
      </button>
      {isOpen && <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Sidebar;
