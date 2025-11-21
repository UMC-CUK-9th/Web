import { useState } from "react";
import useUpdateComment from "../../hooks/mutations/useUpdateComment";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import type { Comment } from "../../types/lp";
import { useAuth } from "../../context/AuthContext";

interface Props {
  comment: Comment;
  lpid: string;
}

const LpCommentButton = ({ comment, lpid }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const { user: currentUser } = useAuth();
  const isAuthor = currentUser?.id === comment.author.id;

  const { mutate: updateMutate, isPending: isUpdating } = useUpdateComment();
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteComment();

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateMutate(
      { lpid: lpid, commentId: comment.id , content: editedContent },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleDelete = () => {
     deleteMutate({ lpid: lpid, commentId: comment.id });
  };

  return (
    <li className="flex gap-3">
      <img
        src={comment.author.avatar}
        alt="avatar"
        className="w-8 h-8 rounded-full bg-gray-700"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-white">
            {comment.author.name}
          </span>
          {isAuthor && !isEditing && (
            <div className="flex gap-2 text-xs text-gray-400">
              <button
                onClick={() => setIsEditing(true)}
                className="hover:text-white cursor-pointer"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="hover:text-white disabled:opacity-50 cursor-pointer"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="mt-2">
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
            <div className="flex gap-2 mt-2 justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-600 rounded text-sm hover:bg-gray-500 cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600 disabled:opacity-50 cursor-pointer"
              >
                저장
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-300">{comment.content}</p>
        )}
      </div>
    </li>
  );
};

export default LpCommentButton;