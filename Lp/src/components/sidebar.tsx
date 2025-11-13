import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-60 bg-[#252525ff] text-center text-white p-5 flex flex-col justify-between">
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
      <button className="flex w-full justify-center">탈퇴하기</button>
    </div>
  );
};

export default Sidebar;
