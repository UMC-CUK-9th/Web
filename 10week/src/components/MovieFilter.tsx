import { useState, memo } from "react";
import type{ MovieFilters, MovieLanguage } from "../types/movie";
import { Input } from "./input";
import { SelectBox } from "./SelectBox";
import { LANGUAGE_OPTIONS } from "../constants/movie";
import LanguageSelector from "./LanguageSelector";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps): Element => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState("ko-KR");

  // 💡 handleSubmit을 onSubmit 핸들러로 사용하여 Enter 키 입력도 처리합니다.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    // 폼 제출 시 페이지가 새로고침되는 기본 동작을 막습니다.
    event.preventDefault(); 
    
    console.log("🔥 검색 버튼 또는 Enter 키로 검색됨");
    console.log("현재 필터 상태:", {
      query,
      include_adult: includeAdult,
      language,
    });

    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };

    onChange(filters);
  };

  return (
    // 💡 전체 필터 영역을 <form>으로 감싸고 onSubmit 핸들러를 연결합니다.
    <form 
      onSubmit={handleSubmit}
      className="transform space-y-6 rounded-2xl border border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl"
    >
      <div className="flex flex-wrap gap-6">
        <div className="min-w-[450px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            영화 제목
          </label>
          <Input value={query} onChange={setQuery} />
        </div>
        
        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="min-w-[250px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* <button>은 form 안에 있으면 기본적으로 submit 타입이 됩니다. */}
        <div className="pt-4">
          <button type="submit" className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-150">
            영화 검색
          </button>
        </div>
      </div>
    </form>
  );
};

export default memo(MovieFilter);