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
        bottom-[90px]             /* footer 위에 안정적으로 고정됨 */
        w-16 h-16 
        rounded-full 

        bg-gradient-to-br from-pink-400 to-pink-600
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