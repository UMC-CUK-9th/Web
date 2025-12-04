import React from "react";

interface LpToolbarProps {
  search: string;
  sort: "asc" | "desc";
  onChangeSearch: (value: string) => void;
  onChangeSort: (value: "asc" | "desc") => void;
}

const LpToolbar = ({
  search,
  sort,
  onChangeSearch,
  onChangeSort,
}: LpToolbarProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">LP 목록</h1>

      <div className="flex items-center gap-3">
        {/* 검색 입력 */}
        <input
          type="text"
          placeholder="검색어 입력..."
          value={search}
          onChange={(e) => onChangeSearch(e.target.value)}
          className="border border-gray-300 rounded-md text-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        {/* 정렬 필터 */}
        <select
          id="sort"
          value={sort}
          onChange={(e) => onChangeSort(e.target.value as "asc" | "desc")}
          className="border border-gray-300 rounded-md text-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="desc">최신순</option>
          <option value="asc">오래된순</option>
        </select>
      </div>
    </div>
  );
};

// 부모에서 props가 안 바뀌면 리렌더 스킵
export default React.memo(LpToolbar);
