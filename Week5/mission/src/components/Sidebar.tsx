

import { useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {

  const sidebarRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(sidebarRef, onClose);

  return (
    <>

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `} 
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Menu</h2>

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


    </>
  );
};

export default Sidebar;