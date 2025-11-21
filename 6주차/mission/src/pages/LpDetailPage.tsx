import { useParams } from "react-router-dom";
import { useState, useRef, type FormEvent } from "react";
import useGetLpDetail from "../hooks/useGetLpDetail";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDisplay from "../components/ErrorDisplay";
import { useGetMyInfo } from "../hooks/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import LpCommentSection from "../components/LpComment/LpCommentSection";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import type { UpdateLp } from "../types/lp";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();

  const { data, isLoading, isError } = useGetLpDetail(lpid);
  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const { mutate: deleteMutate } = useDeleteLp();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateLp();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedFile, setEditedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !lpid) {
    return <ErrorDisplay />;
  }

  const lp = data?.data;
  const isLiked = lp?.likes.some((like) => like.userId === me?.data.id);

  const handleLike = () => {
    likeMutate(lpid);
  };

  const handleDisLike = () => {
    disLikeMutate(lpid);
  };

  const handleDelete = () => {
    deleteMutate(lpid);
  };

  const handleEditToggle = () => {
    setEditedTitle(lp?.title || "");
    setEditedFile(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload: Partial<UpdateLp> = { title: editedTitle};
    updateMutate(
      { lpid , payload},
      {
        onSuccess: () => {
          setIsEditing(false);
          setEditedFile(null);
        },
      }
    );
  };

  return (
    <div className="p-8 max-w-3xl mx-auto text-gray-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <img
            src={lp?.author.avatar}
            alt="작성자 아바타"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold text-white">{lp?.author.name}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          {!isEditing ? (
            <>
              <button
                onClick={handleEditToggle}
                className="hover:text-white text-black cursor-pointer"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="hover:text-white text-black cursor-pointer"
              >
                삭제
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                disabled={isUpdating}
                className="font-semibold text-green-500 hover:text-green-400 disabled:opacity-50 cursor-pointer"
              >
                저장
              </button>
              <button
                onClick={handleCancelEdit}
                className="font-semibold text-red-500 hover:text-red-400 cursor-pointer"
              >
                취소
              </button>
            </>
          )}
        </div>
      </div>

      {!isEditing ? (
        <h1 className="text-4xl font-bold mb-6 text-white">{lp?.title}</h1>
      ) : (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="text-4xl font-bold mb-6 text-white bg-gray-800 border border-gray-700 rounded-lg p-2 w-full"
        />
      )}

      {!isEditing ? (
        <img
          src={lp?.thumbnail}
          alt="lp 썸네일"
          className="w-full rounded-lg mb-6 bg-gray-900 p-4 size-100 object-cover"
        />
      ) : (
        <div className="mb-6">
          {editedFile && (
            <img
              src={URL.createObjectURL(editedFile)}
              alt="새 썸네일 미리보기"
              className="w-full rounded-lg mb-4 bg-gray-900 p-4 size-100 object-cover"
            />
          )}
          {!editedFile && (
            <img
              src={lp?.thumbnail}
              alt="현재 썸네일"
              className="w-full rounded-lg mb-4 bg-gray-900 p-4 size-100 object-cover opacity-50"
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="w-full text-sm text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-pink-50 file:text-black-700
                      hover:file:bg-pink-100"
          />
        </div>
      )}

      {!isEditing && (
        <div className="flex justify-center items-center gap-2">
          <button
            className="text-pink-500 text-3xl transition-transform hover:scale-125 cursor-pointer"
            onClick={isLiked ? handleDisLike : handleLike}
          >
            ❤️
          </button>
          <span className="text-xl font-semibold text-white">
            {lp?.likes.length}
          </span>
        </div>
      )}

      <LpCommentSection lpid={lpid} />
    </div>
  );
};

export default LpDetailPage;