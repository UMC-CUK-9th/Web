import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Lp } from "../types/lps";
import { FaHeart } from "react-icons/fa";

const LpCard = ({ lp }: { lp: Lp }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div
      className="relative aspect-square cursor-pointer"
      onClick={() => navigate(`/lp/${lp.id}`)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-full object-cover"
      />
      {isHover && (
        <div className="absolute inset-0 w-full h-full p-3 bg-black/50 flex flex-col text-white backdrop-blur">
          <p className="text-sm">{lp.title}</p>
          <div className="flex justify-between text-xs pt-2">
            <p>{lp.createdAt.slice(0, 10)}</p>
            <div className="flex items-center gap-2">
              <FaHeart />
              <p>{lp.likes.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LpCard;
