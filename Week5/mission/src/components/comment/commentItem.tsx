
import { FaUserCircle } from "react-icons/fa";
import type { CommentItem as CommentItemType } from "../../types/comment";
import { useAuth } from "../../hooks/useAuth"; 
import { useState } from "react"; 
import { MoreHorizontal, Edit2, Trash2 } from "lucide-react"; 
import useUpdateLpComment from "../../hooks/mutations/useUpdateLpComment"; 
import useDeleteLpComment from "../../hooks/mutations/useDeleteLpComment"; 

const formatCommentDate = (dateString: Date) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error("Invalid date");
    return date.toLocaleDateString("ko-KR", {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  } catch (e) {
    console.error("오류:", e); 
    return "날짜 정보 없음";
  }
};

interface CommentItemProps {
  comment: CommentItemType;
  lpId: number;
}


const CommentItem = ({ comment, lpId }: CommentItemProps) => {

  const { user } = useAuth(); 
  const isAuthor = user?.id === comment.author.id; 

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const { mutate: updateComment, isPending: isUpdating } = useUpdateLpComment(lpId);
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteLpComment(lpId);

  const handleDelete = () => {
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      deleteComment({ commentId: comment.id });
    }
    setIsMenuOpen(false);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedContent.trim().length < 1) {
      alert("댓글을 1자 이상 입력해주세요.");
      return;
    }
    updateComment(
      { commentId: comment.id, content: editedContent.trim() },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };


  if (isEditing) {
    return (
      <form onSubmit={handleUpdate} className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          {comment.author.avatar ? (
            <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full" />
          ) : (
            <FaUserCircle className="w-8 h-8 text-gray-300" />
          )}
          <span className="font-semibold text-gray-800">{comment.author.name}</span>
        </div>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
          disabled={isUpdating}
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
            disabled={isUpdating}
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
            disabled={isUpdating}
          >
            {isUpdating ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    );
  }


  return (
    <div className="flex gap-4 items-start p-4 border-b border-gray-100">
      {comment.author.avatar ? (
        <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full flex-shrink-0" />
      ) : (
        <FaUserCircle className="w-10 h-10 text-gray-300 flex-shrink-0" />
      )}
      
      <div className="flex-1">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-800">{comment.author.name}</span>
            <span className="text-xs text-gray-400">{formatCommentDate(comment.createdAt)}</span>
          </div>

          {isAuthor && (
            <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} disabled={isDeleting}>
                <MoreHorizontal size={20} className="text-gray-500" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-6 w-32 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => { setIsEditing(true); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Edit2 size={14} /> 수정
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                    disabled={isDeleting}
                  >
                    <Trash2 size={14} /> {isDeleting ? "삭제 중..." : "삭제"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>


        <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;