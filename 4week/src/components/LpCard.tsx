import { Link } from "react-router-dom";
import type { Lp } from "../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <Link
      to={`/lp/${lp.id}`}
      className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 block group" // ← group 추가
    >
      {/* LP 이미지 */}
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full aspect-square"
      />

      {/* 기본 제목 영역 (하단 반투명 바) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
        <h3 className="text-white text-sm font-semibold truncate">{lp.title}</h3>
      </div>

      {/* 🪄 hover 시 표시될 추가 정보 영역 */}
      <div
        className="
          absolute inset-0 flex flex-col items-center justify-center 
          bg-black/70 text-white opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 p-3
        "
      >
        <h3 className="text-lg font-semibold mb-1">{lp.title}</h3>
        <p className="text-sm mb-1">{lp.artist}</p>
        <p className="text-xs text-center line-clamp-2">{lp.description}</p>
      </div>
    </Link>
  );
};

export default LpCard;
