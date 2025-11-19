interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed 
        right-6 
        bottom-[90px]             
        w-16 h-16 
        rounded-full 

        bg-gradient-to-br from-blue-700 to-blue-900
        text-white 
        text-5xl 
        font-extrabold
        flex items-center 
        justify-center
        
        shadow-[0_6px_25px_rgba(0,0,0,0.35)]
        hover:scale-110 
        active:scale-95

        transition-all duration-200 ease-out
        z-[99999]
      "
    >
      +
    </button>
  );
};

export default FloatingButton;
