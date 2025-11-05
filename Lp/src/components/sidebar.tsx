import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-full w-60 bg-[#252525ff] text-center text-white p-5">
      <div className="flex items-center gap-2 pl-5 mb-3">
        <FaSearch />
        찾기
      </div>
      <div className="flex items-center gap-2 pl-5">
        <FaUser />
        마이페이지
      </div>
    </div>
  );
};

export default Sidebar;
