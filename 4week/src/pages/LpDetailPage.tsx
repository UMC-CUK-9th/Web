import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useRef, useState } from "react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { Heart } from "lucide-react";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { Modal } from "../components/Modal";
import CommentPage from "./CommentPage";
import usePatchLps from "../hooks/mutations/usePatchLps";
import useDeleteLps from "../hooks/mutations/useDeleteLps";
import useImageUpload from "../hooks/mutations/useImageUpload";
import type { CreateLpsDto } from "../types/lp";

const LpDetailPage = () => {
  const { lpid } = useParams();

  const { data: lp, isPending, isError } = useGetLpDetail({
    lpid: Number(lpid),
  });

  const [CommentOpen, setCommentOpen] = useState(false);

  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  // 좋아요 mutation
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();
  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  const navigate = useNavigate();

  const handleCommits = () => {
    setCommentOpen(true);
  };

  const handleLikeLp = () => {
    likeMutate({ lpid: Number(lpid) });
  };

  const handleDisLikeLp = () => {
    dislikeMutate({ lpid: Number(lpid) });
  };

  // 작성자 여부
  const isAuthor = me?.data.id === lp?.data.authorId;
  const [isEditing, setIsEditing] = useState(false);

  // 수정 입력값
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // 이미지
  const [iamgePreview, setImagePreview] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: patchLpMutate } = usePatchLps(Number(lpid));
  const { mutate: deleteLpMutate } = useDeleteLps();

  const { mutate: uploadImage, isPending: isUploading } = useImageUpload({
    onSuccessCallback: (data) => {
      setImagePreview(data.data.imageUrl);
      setThumbnailUrl(data.data.imageUrl);
    },
    onErrorCallback: () => {
      setImagePreview(lp?.data.thumbnail ?? null);
      setThumbnailUrl(lp?.data.thumbnail ?? null);
      alert("이미지 업로드 실패");
    },
  });

  const handleStartEdit = () => {
    if (!lp?.data) return;
    setEditTitle(lp.data.title);
    setEditContent(lp.data.content);
    setImagePreview(lp.data.thumbnail);
    setThumbnailUrl(lp.data.thumbnail);
    setEditTags(lp.data.tags.map((t) => t.name));
    setTagInput("");
    setIsEditing(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

    const formData = new FormData();
    formData.append("file", file);

    uploadImage(formData);
  };

  const handleSaveEdit = () => {
    const payload: CreateLpsDto = {
      title: editTitle,
      content: editContent,
      thumbnail: thumbnailUrl,
      tags: editTags,
      published: true,
    };

    patchLpMutate(payload, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleDelete = () => {
    deleteLpMutate(
      { lpid: Number(lpid) },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  const handleAddTag = () => {
    if (tagInput && !editTags.includes(tagInput)) {
      setEditTags([...editTags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setEditTags(editTags.filter((t) => t !== tag));
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        상세 데이터를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-20 mx-auto h-screenjustify-center items-center border-gray-500 border-2 p-4 rounded-large shadow-lg bg-lime-200 w-[70%] max-h-[100vh]">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />

      <div className="flex flex-col gap-4">
        {/* 작성자 / 날짜 */}
        <div className="flex justify-between">
          <h1>
            {typeof lp.data.author === "string"
              ? lp.data.author
              : (lp.data.author as any)?.name}
          </h1>
          <p>{new Date(lp.data.updatedAt).toLocaleDateString()}</p>
        </div>

        {/* 제목 + 수정/삭제/댓글 */}
        <div className="flex justify-between items-center">
          {!isEditing ? (
            <h1 className="text-xl">{lp.data.title}</h1>
          ) : (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-xl p-2 border rounded"
            />
          )}

          <div className="flex gap-5 mr-5">
            {isAuthor && (
              <>
                {!isEditing ? (
                  <>
                    <button onClick={handleStartEdit} className="cursor-pointer">
                      ✏️
                    </button>
                    <button onClick={handleDelete} className="cursor-pointer">
                      🗑️
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={handleSaveEdit} className="cursor-pointer">
                      💾
                    </button>
                  </>
                )}
              </>
            )}
            <button className="cursor-pointer" onClick={handleCommits}>
              💬
            </button>
          </div>
        </div>

        {/* 썸네일 */}
        {isEditing ? (
          <img
            src={iamgePreview ?? ""}
            alt={editTitle}
            className="aspect-square object-cover rounded-2xl cursor-pointer relative w-1/2 mx-auto"
            onClick={() => !isUploading && fileInputRef.current?.click()}
          />
        ) : (
          <img
            src={lp.data.thumbnail}
            alt={lp.data.title}
            className="aspect-square w-1/2 mx-auto object-cover rounded-2xl"
          />
        )}

        {/* 내용 + 태그 */}
        {!isEditing ? (
          <>
            <h2 className="flex justify-center items-center">
              {lp.data.content}
            </h2>
            <div className="flex justify-center items-center flex-wrap gap-2">
              {lp.data.tags.map((t) => (
                <span
                  key={t.id}
                  className="p-2 bg-gray-400 text-black rounded-md"
                >
                  #{t.name}
                </span>
              ))}
            </div>
          </>
        ) : (
          <>
            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="p-2 border rounded"
              type="text"
            />

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="태그 입력"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="p-2 bg-gray-600 text-white rounded"
                >
                  추가
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {editTags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 p-2 bg-gray-700 text-white rounded-md text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="font-bold hover:text-red-500"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 좋아요 */}
        <button
          onClick={isLiked ? handleDisLikeLp : handleLikeLp}
          className="flex justify-center items-center"
        >
          <Heart
            color={isLiked ? "red" : "black"}
            fill={isLiked ? "red" : "transparent"}
          />
          {lp.data.likes.length}
        </button>
      </div>

      {/* 댓글 모달 */}
      <Modal isOpen={CommentOpen} onClose={() => setCommentOpen(false)}>
        <CommentPage />
      </Modal>
    </div>
  );
};

export default LpDetailPage;