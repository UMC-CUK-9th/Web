// src/components/LpCreateModal.tsx

import React, { useState, useRef, useEffect } from "react";
import { usePostLp } from "../hooks/mutations/usePostLp";
import { X, Upload } from "lucide-react"; // X와 Upload 아이콘 임포트

interface LpCreateModalProps {
  onClose: () => void;
}

const LpCreateModal = ({ onClose }: LpCreateModalProps) => {
  // [디버깅 로그] 모달 컴포넌트가 실행되는지 확인
  console.log("🔥 [LpCreateModal] 컴포넌트가 실행(렌더링)되었습니다!");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createLp, isPending } = usePostLp();

  // 모달이 열릴 때 배경 스크롤을 막고, 닫힐 때 복구합니다.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // 태그 추가
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // 태그 삭제
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // LP 생성 요청
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !thumbnail) {
      alert("제목, 내용, 썸네일은 필수입니다.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnail", thumbnail);
    formData.append("tags", JSON.stringify(tags));

    createLp(formData, {
      onSuccess: () => {
        alert("LP가 성공적으로 등록되었습니다!");
        onClose(); // 성공 시 모달 닫기
      },
    });
  };

  return (
    // 모달 배경 (클릭 시 닫힘)
    // [수정] z-index를 매우 높게 설정하여 다른 요소에 가려지지 않게 함
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99999]"
      onClick={onClose}
    >
      {/* 모달 컨텐츠 (클릭 이벤트 전파 방지) */}
      <div
        className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-2xl shadow-2xl relative m-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          새 LP 만들기
        </h2>

        {/* 썸네일 미리보기 및 업로드 (LP판 모양) */}
        <div className="flex justify-center mb-6">
          <div
            className="w-40 h-40 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden cursor-pointer relative border-4 border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors group"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover animate-spin-slow"
              />
            ) : (
              // 업로드 아이콘으로 변경
              <div className="flex flex-col items-center text-gray-400 group-hover:text-pink-500 transition-colors">
                <Upload size={32} className="mb-2" />
                <p className="text-xs font-medium">Click to upload</p>
              </div>
            )}
            {/* 중앙 구멍 */}
            <div className="absolute w-12 h-12 bg-white dark:bg-gray-900 rounded-full border-4 border-gray-200 dark:border-gray-700 group-hover:border-pink-500 transition-colors"></div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="LP Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white transition-all"
          />
          <textarea
            placeholder="LP Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-24 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white transition-all"
          />

          {/* 태그 입력 */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTag())
              }
              className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 font-medium transition-colors"
            >
              Add
            </button>
          </div>

          {/* 태그 목록 */}
          <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm font-medium"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-pink-800 dark:hover:text-pink-200 ml-1"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 mt-4"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                업로드 중...
              </span>
            ) : (
              "Add LP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LpCreateModal;