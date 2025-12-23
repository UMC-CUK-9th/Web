import React from "react";

interface PaginationProps {
  page: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({ page, onPrev, onNext }: PaginationProps) => {
  return (
    <div className="flex justify-center gap-4 my-8">
      <button
        disabled={page === 1}
        onClick={onPrev}
        className={`px-4 py-2 rounded ${
          page === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-purple-300 text-white hover:bg-purple-400"
        }`}
      >
        &lt;
      </button>

      <span className="px-4 py-2">{page} 페이지</span>

      <button
        onClick={onNext}
        className="px-4 py-2 rounded bg-purple-300 text-white hover:bg-purple-400"
      >
        &gt;
      </button>
    </div>
  );
};

export default React.memo(Pagination);
