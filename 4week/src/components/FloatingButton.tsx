import { FaPlus } from "react-icons/fa6";

const FloatingButton = () => {
  return (
    <button className="absolute bottom-5 right-5 rounded-full bg-pink-500 size-15 flex items-center justify-center text-white text-xl cursor-pointer">
      <FaPlus />
    </button>
  );
};
export default FloatingButton;