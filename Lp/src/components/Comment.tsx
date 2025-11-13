import type { Comment } from "../types/comments";
import { FiMoreVertical } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import usePatchComment from "../hooks/mutations/usePatchComment";
import { FaCheck } from "react-icons/fa6";
import useDeleteComment from "../hooks/mutations/useDeleteComment";

interface commentProps {
  comment: Comment;
  lpId: number;
}

export default function CommentCard({ comment, lpId }: commentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isPatch, setIsPatch] = useState(false);

  const { mutate: patchMutate } = usePatchComment();
  const { mutate: deleteMutate } = useDeleteComment();

  const handlePatchComment = () => {
    const CommentData = {
      lpId: lpId,
      commentId: comment.id,
      content: newComment,
    };
    patchMutate(CommentData, {
      onSuccess: () => {
        setNewComment("");
      },
      onError: (error) => {
        console.error("댓글수정오류", error);
        alert("수정에 실패했습니다");
      },
    });
  };

  const handleDeleteComment = () => {
    const CommentData = {
      lpId: lpId,
      commentId: comment.id,
    };
    deleteMutate(CommentData, {
      onSuccess: () => {
        alert("삭제되었습니다");
      },
      onError: (error) => {
        console.error("댓글삭제오류", error);
        alert("삭제를 실패했습니다");
      },
    });
  };

  return (
    <div className="flex w-full items-center justify-between pt-2">
      <div className="flex">
        <img
          src={comment.author.avatar}
          alt={`${comment.author.avatar} 프로필 이미지`}
          className="rounded-full w-8 h-8"
        />
        <div className="pl-3">
          <p>{comment.author.name}</p>
          {!isPatch ? (
            <p>{comment.content}</p>
          ) : (
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={comment.content}
              className="border border-white"
            />
          )}
        </div>
      </div>
      <div className="relative">
        {!isPatch ? (
          <>
            <FiMoreVertical
              className="cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <div className="absolute top-6 flex gap-3 items-center bg-black rounded-md">
                <GoPencil
                  onClick={() => {
                    setIsPatch(true);
                    setIsOpen(false);
                  }}
                />
                <FaRegTrashAlt
                  onClick={() => {
                    setIsOpen(false);
                    handleDeleteComment();
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <FaCheck className="cursor-pointer" onClick={handlePatchComment} />
        )}
      </div>
    </div>
  );
}
