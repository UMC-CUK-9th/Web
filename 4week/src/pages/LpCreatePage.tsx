// src/pages/LpCreatePage.tsx

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePostLp } from "../hooks/mutations/usePostLp";
import { X } from "lucide-react";

// 모달이 아닌 페이지이므로 onClose 프롭스가 필요 없습니다.
const LpCreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createLp, isPending } = usePostLp();

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
        navigate("/"); // 성공 시 홈으로 이동
      },
    });
  };

  return (
    // 페이지 컨테이너 (모달 배경 대신)
    <div className="container mx-auto max-w-md p-6 mt-16 bg-gray-900 text-white rounded-2xl shadow-xl">
      {/* 닫기 버튼 대신 '뒤로 가기' 버튼 */}
      <button
        onClick={() => navigate(-1)} // 뒤로 가기
        className="mb-4 text-gray-400 hover:text-white flex items-center gap-1"
      >
        <X size={20} /> <span>취소</span>
      </button>

      {/* 썸네일 미리보기 및 업로드 (LP판 모양) */}
      <div className="flex justify-center mb-6">
        <div
          className="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden cursor-pointer relative border-4 border-gray-700 hover:border-gray-500 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Thumbnail Preview"
              className="w-full h-full object-cover animate-spin-slow"
            />
          ) : (
            <div className="text-center text-gray-500">
              <p>Click to upload</p>
              <p className="text-xs">(LP Image)</p>
            </div>
          )}
          <div className="absolute w-12 h-12 bg-gray-900 rounded-full border-4 border-gray-700"></div>
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
          className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <textarea
          placeholder="LP Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 bg-gray-800 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {/* 태그 입력 */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add Tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
            className="flex-1 p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 font-bold"
          >
            Add
          </button>
        </div>

        {/* 태그 목록 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-700 rounded-full text-sm flex items-center gap-1"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-gray-400 hover:text-red-500 ml-1"
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPending ? "Uploading..." : "Add LP"}
        </button>
      </form>
    </div>
  );
};

export default LpCreatePage;