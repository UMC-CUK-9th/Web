import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useRef, useEffect, type ChangeEvent } from "react";

import Loading from "../../components/common/Loading";
import ErrorFallback from "../../components/common/ErrorFallBack";
import { fetchLpDetail } from "../../services/fetchLpDetail";
import { useLpMutations } from "../../hooks/useLpMutations";

const EditLpDetail = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const { updateLp } = useLpMutations(lpid!);

  const { data: lp, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: () => fetchLpDetail(lpid!),
    enabled: !!lpid,
  });

  // form states
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 초기 데이터 채우기
  useEffect(() => {
    if (!lp) return;

    setTitle(lp.title);
    setContent(lp.content);
    setThumbnail(lp.thumbnail);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedTags = lp.tags?.map((t: any) =>
      typeof t === "string" ? t : t.name
    ) ?? [];

    setTags(parsedTags);
  }, [lp]);

  // 태그 추가/제거
  const handleAddTag = () => {
    if (!tag.trim()) return;
    if (tags.includes(tag.trim())) return;
    setTags([...tags, tag.trim()]);
    setTag("");
  };

  const handleRemoveTag = (target: string) => {
    setTags(tags.filter((t) => t !== target));
  };

  // 이미지 클릭
  const handleClickImage = () => {
    fileInputRef.current?.click();
  };

  // 이미지 업로드
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  // 수정 요청
  const handleSubmit = () => {
    updateLp.mutate(
      {
        title,
        content,
        thumbnail,
        tags,
      },
      {
        onSuccess: () => {
          navigate(`/lp/${lpid}`);
        },
      }
    );
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorFallback error={error} onRetry={refetch} />;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-black">
      <h1 className="text-2xl font-bold mb-6">LP 수정</h1>

      {/* 이미지 */}
      <div
        className="mb-3 cursor-pointer"
        onClick={handleClickImage}
      >
        <img
          src={file ? URL.createObjectURL(file) : thumbnail}
          alt="LP"
          className="w-full rounded shadow"
        />
      </div>

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* 제목 */}
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2 mb-3"
      />

      {/* 내용 */}
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2 mb-3 h-32"
      />

      {/* 태그 */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="태그"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={handleAddTag}
          disabled={!tag.trim()}
          className={`px-3 rounded ${
            tag.trim()
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          추가
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {tags.map((t) => (
          <div
            key={t}
            className="flex items-center border border-green-500 px-2 py-1 rounded-sm text-sm"
          >
            <span>{t}</span>
            <button
              className="ml-2 text-red-600 font-bold"
              onClick={() => handleRemoveTag(t)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!title.trim() || !content.trim()}
        className={`w-full py-2 rounded text-white ${
          title.trim() && content.trim()
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        저장
      </button>
    </div>
  );
};

export default EditLpDetail;
