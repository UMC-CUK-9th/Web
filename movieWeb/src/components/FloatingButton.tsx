import { useState } from "react";
import { Plus } from "lucide-react";
import LpModal from "./LpModal";

const FloatingButton = () => {
  const [open, setOpen] = useState(false);
 
  return (
    <>
      <button
        onClick={() => setOpen(true)}
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
      >
        <Plus size={28} strokeWidth={3} />
      </button>

      <LpModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default FloatingButton;
