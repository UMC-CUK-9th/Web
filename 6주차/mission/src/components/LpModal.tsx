import { useState, type ChangeEvent } from "react";

interface LpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LpModal = ({ isOpen, onClose }: LpModalProps) => {
  const [selectFile, setSelectFile] = useState<File | null>(null);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectFile(e.target.files[0]);
    }
  };

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const handleRemoveTag = (tagRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagRemove));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-7 rounded-2xl shadow-xl max-w-sm w-full relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-semibold"
        >
          ✕
        </button>

        {/* 이미지 업로드 */}
        <label htmlFor="lp-image" className="cursor-pointer flex justify-center mb-5">
          {selectFile ? (
            <img
              src={URL.createObjectURL(selectFile)}
              className="w-32 h-32 rounded-xl object-cover border border-gray-200 shadow-sm"
              alt="LP Thumbnail Preview"
            />
          ) : (
            <div className="w-32 h-32 rounded-xl bg-gray-100 border border-gray-300 shadow-inner flex flex-col items-center justify-center text-gray-400">
              <span className="text-3xl mb-1">📀</span>
              <span className="text-xs">이미지 업로드</span>
            </div>
          )}
        </label>
        <input id="lp-image" type="file" onChange={handleFile} className="hidden" />

        <form className="w-full space-y-4">
          {/* LP 제목 */}
          <input
            type="text"
            placeholder="LP 제목"
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* LP 내용 */}
          <input
            type="text"
            placeholder="LP 설명"
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* 태그 입력 */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="태그 입력"
              value={tagInput}
              onChange={handleTagInput}
              className="flex-grow p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
            >
              추가
            </button>
          </div>

          {/* 태그 리스트 */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <div
                key={tag}
                className="bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm flex items-center gap-2"
              >
                <span className="text-gray-700">#{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-gray-500 hover:text-gray-700 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
          >
            LP 등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default LpModal;
