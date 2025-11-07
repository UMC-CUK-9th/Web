import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // ✅ 클릭 시 홈으로 이동
  };

  return (
    <button
      onClick={handleClick}
      className="
        fixed bottom-6 right-6
        w-14 h-14
        rounded-full
        bg-green-500 hover:bg-green-600
        text-white
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        transition-all duration-300
      "
      aria-label="Add new item"
    >
      <Plus size={28} strokeWidth={3} />
    </button>
  );
};

export default FloatingButton;
