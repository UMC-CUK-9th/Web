import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddLpModal from "./AddLpModal";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <button
        className="absolute bottom-5 right-5 rounded-full bg-pink-500 size-15 flex items-center justify-center text-white text-xl cursor-pointer"
        onClick={handleClick}
      >
        <FaPlus />
      </button>
      <AddLpModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
export default FloatingButton;
