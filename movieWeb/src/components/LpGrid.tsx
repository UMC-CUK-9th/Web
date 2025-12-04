import React from "react";
import { Heart } from "lucide-react";
import type { LpItem } from "../types/lp";

interface LpGridProps {
  items: LpItem[];
  onClickItem: (id: string | number) => void;
}

const LpGrid = ({ items, onClickItem }: LpGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onClickItem(item.id)}
          className="relative w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer aspect-square group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-500"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out flex flex-col justify-end p-3">
            <h2 className="text-white font-semibold text-sm line-clamp-1 mb-1 drop-shadow-md">
              {item.title}
            </h2>
            <div className="flex justify-between items-center text-xs text-gray-200 drop-shadow-sm">
              <p>{new Date(item.createdAt).toLocaleDateString("ko-KR")}</p>
              <div className="flex items-center gap-1">
                <Heart size={14} className="text-red-400" />
                <span>{item.likes?.length ?? 0}</span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default React.memo(LpGrid);
