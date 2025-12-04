import React from "react";

interface SearchFormProps {
  searchTerm: string;
  formIncludeAdult: boolean;
  formLanguage: string;
  isSearching: boolean;
  onChangeSearchTerm: (value: string) => void;
  onChangeIncludeAdult: (value: boolean) => void;
  onChangeLanguage: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

const MovieSearchForm = ({
  searchTerm,
  formIncludeAdult,
  formLanguage,
  isSearching,
  onChangeSearchTerm,
  onChangeIncludeAdult,
  onChangeLanguage,
  onSubmit,
  onReset,
}: SearchFormProps) => {
  return (
    <div className="px-10 py-6">
      <div className="border border-gray-300 rounded-xl shadow-xl p-6 w-4/5 mx-auto">
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          {/* 제목 + 옵션 */}
          <div className="flex gap-4">
            {/* 제목 */}
            <div className="w-1/2">
              <span className="block w-full text-center font-medium mb-1">
                🎬영화 제목
              </span>
              <input
                type="text"
                placeholder="영화 제목을 입력하세요"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                value={searchTerm}
                onChange={(e) => onChangeSearchTerm(e.target.value)}
              />
            </div>

            {/* 성인 */}
            <div className="w-1/2">
              <span className="block w-full text-center font-medium mb-1">
                ⚙️옵션
              </span>
              <label className="border border-gray-300 rounded px-4 py-2 w-full flex items-center gap-2 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={formIncludeAdult}
                  onChange={(e) => onChangeIncludeAdult(e.target.checked)}
                />
                성인 콘텐츠 포함
              </label>
            </div>
          </div>

          {/* 언어 */}
          <div className="flex flex-col gap-2">
            <span className="block w-full text-center font-medium">🌐언어</span>
            <select
              className="border border-gray-300 rounded px-2 py-2 w-full"
              value={formLanguage}
              onChange={(e) => onChangeLanguage(e.target.value)}
            >
              <option value="ko-KR">한국어</option>
              <option value="en-US">영어</option>
              <option value="ja-JP">일본어</option>
            </select>
          </div>

          {/* 검색 / 초기화 버튼 */}
          <div className="flex flex-col gap-3 mt-2">
            <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full">
              🔍검색
            </button>

            {isSearching && (
              <button
                type="button"
                onClick={onReset}
                className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 w-full"
              >
                초기화
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// 부모에서 props가 안 바뀌면 리렌더 X
export default React.memo(MovieSearchForm);
