import { memo, useState } from "react";
import type { MovieFilters } from "../types/movie";
import { SelectBox } from "./SelectBox";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_OPTIONS } from "../constants/movie";
import { Input } from "./Input";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState("ko-KR");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };
    onChange(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="transform space-y-6 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl"
    >
      <div className="flex flex-wrap gap-6 items-end">
        <div className="min-w-[300px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            영화 제목
          </label>
          <Input 
            value={query} 
            onChange={setQuery} 
            placeholder="영화 제목을 입력하세요" 
          />
        </div>

        <div className="min-w-[150px]">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="h-[42px]" 
          />
        </div>

        <div className="min-w-[150px]">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
          />
        </div>


        <div className="min-w-[100px]">
          <button
            type="submit"
            className="h-[42px] w-full rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            검색
          </button>
        </div>
      </div>
    </form>
  );
};

export default memo(MovieFilter);