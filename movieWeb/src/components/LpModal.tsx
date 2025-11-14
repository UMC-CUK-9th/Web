import { useRef, useState } from "react";
import { useCreateLp } from "../hooks/useCreateLp";
import LpImg from "../assets/images/LP.png";

interface LpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LpModal = ({ isOpen, onClose }: LpModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: createLp, isPending } = useCreateLp();

  if (!isOpen) return null;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleAddTag = () => {
    if (!tag.trim()) return;
    if (tags.includes(tag.trim())) return;

    setTags([...tags, tag.trim()]);
    setTag("");
  };

  const handleRemoveTag = (removeTag: string) => {
    setTags(tags.filter((t) => t !== removeTag));
  };

  const handleSubmit = () => {
    const body = {
      title: name,
      content,
      thumbnail: file 
        ? URL.createObjectURL(file)  // 실제 파일 URL이 아니라 서버/스토리지 업로드 필요
        : LpImg,                     // 기본 이미지 URL
      tags,
      published: true,
    };

    createLp(body, {
      onSuccess: () => onClose(),
    });
  };


  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">LP 생성</h2>
          <button onClick={onClose} className="p-0 m-0 font-bold">X</button>
        </div>

        <div className="mb-3 cursor-pointer" onClick={handleImageClick}>
          <img
            src={file ? URL.createObjectURL(file) : LpImg}
            alt="LP Preview"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <input
          type="text"
          placeholder="LP Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-sm mb-2 p-1 pl-2"
        />

        <input
          type="text"
          placeholder="LP Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-sm mb-2 p-1 pl-2"
        />

        <div className="flex justify-between mb-2">
          <input
            type="text"
            placeholder="LP Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-4/5 border rounded-sm p-1 pl-2 mr-1"
          />
          <button 
            onClick={handleAddTag}
            disabled={!tag.trim()}
            className={`w-1/5 rounded 
              ${tag.trim()
                ? "text-white bg-green-500 hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((t) => (
            <div
              key={t}
              className="flex items-center border border-green-500 px-2 py-1 rounded-sm text-sm"
            >
              <span>{t}</span>
              <button
                onClick={() => handleRemoveTag(t)}
                className="ml-2 text-red-600 font-bold"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name.trim() || !content.trim() || isPending}
          className={`w-full mt-3 p-2 rounded 
            ${name.trim() && content.trim()
              ? "text-white bg-green-500 hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          {isPending ? "처리 중..." : "Add LP"}
        </button>
      </div>
    </div>
  );
};

export default LpModal;
