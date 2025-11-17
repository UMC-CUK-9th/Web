import { useEffect, useState, type MouseEvent } from "react";
import useLpAdd from "../hooks/mutations/useLpAdd";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateLpsDto } from "../types/lp";
import useImageUpload from "../hooks/mutations/useImageUpload"; 
import { LoadingSpinner } from "./LoadingSpinner";

interface LpAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const LpAdd = ({ isOpen, onClose }: LpAddProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const { mutate: uploadImage, isPending: isUploading } = useImageUpload({
  onSuccessCallback: (res) => {
    const url =
        res.data?.imageUrl ??
        null;

    setThumbnailUrl(url);
    },
  onErrorCallback: (error) => {
    console.error("이미지 업로드 실패:", error);
    alert("이미지 업로드에 실패했습니다.");
    setSelectedFile(null);
    setImagePreview(null);
  }
});


  const { mutate: AddLpMutate } = useLpAdd({
    onSuccessCallback: () => {
      onClose();
    }
  });

  const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags((prev) => [...prev, inputTag]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      lptitle: "",
      lpcontent: "",
    },
  });

  useEffect(() => {
    console.log("🔴 [LpAdd] isOpen changed:", isOpen);
    if (!isOpen) {
      setSelectedFile(null);
      setImagePreview(null);
      setThumbnailUrl(null);
      setTags([]);
      setInputTag("");
      reset();
    }
  }, [isOpen, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      setThumbnailUrl(null);

      const formData = new FormData();
      formData.append("file", file);
      uploadImage(formData);
    }
  };

  const onSubmit: SubmitHandler<{ lptitle: string; lpcontent: string }> = async (data) => {
    if (isUploading) {
      alert("이미지가 아직 업로드 중입니다.");
      return;
    }

    if (!thumbnailUrl) {
      alert("이미지가 업로드되지 않았습니다.");
      return;
    }

    const payload: CreateLpsDto = {
      title: data.lptitle,
      content: data.lpcontent,
      tags,
      published: true,
      thumbnail: thumbnailUrl,
    };

    AddLpMutate(payload);
  };

  if (!isOpen) return null;

  return (
  <div
    className="w-full flex flex-col gap-4"
    onClick={(e: MouseEvent) => e.stopPropagation()}
  >
      
      <div
        className="bg-white w-full max-w-[460px] rounded-2xl p-8 shadow-xl"
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        {/* 이미지 업로드 */}
        <div className="flex justify-center mb-6">
          <label className="w-36 h-36 cursor-pointer rounded-full bg-gray-200 overflow-hidden flex justify-center items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isUploading}
            />
            {isUploading ? (
              <LoadingSpinner />
            ) : imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-cover" />
            ) : (
              <img src="/images/lp.png" className="w-full h-full object-cover" />
            )}
          </label>
        </div>

        {/* 입력폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            className="border p-2 rounded"
            placeholder="LP Name"
            {...register("lptitle")}
          />

          <input
            className="border p-2 rounded"
            placeholder="LP Content"
            {...register("lpcontent")}
          />

          <div className="flex gap-2">
            <input
              className="border p-2 rounded w-full"
              placeholder="LP Tag"
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
            />
            <button type="button" className="px-4 bg-gray-200 rounded" onClick={handleAddTag}>
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="border px-2 py-1 rounded bg-gray-100 flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  className="text-red-600 font-bold"
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-pink-500 text-black p-2 rounded mt-2 font-semibold"
            disabled={isUploading}
            >
            {isUploading ? "이미지 업로드 중..." : "Add LP"}
            </button>
        </form>
      </div>
    </div>
  );
};

export default LpAdd;
