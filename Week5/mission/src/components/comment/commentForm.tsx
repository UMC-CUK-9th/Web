
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import useCreateLpComment from "../../hooks/mutations/useCreateLpComment";
import { FaUserCircle } from "react-icons/fa"; 


interface CommentFormProps {
  lpId: number;
}


const CommentForm = ({ lpId }: CommentFormProps) => {
  const { accessToken, user } = useAuth();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  

  const { mutate: createComment, isPending } = useCreateLpComment(lpId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length < 1) {
      setError("1자 이상 입력");
      return;
    }
    if (content.trim().length > 500) {
      setError("500자 이하로 입력");
      return;
    }
    setError("");
    

    createComment(
      { content: content.trim() },
      {
        onSuccess: () => {
          setContent(""); 
        },
      }
    );
  }; 

  if (!accessToken) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
        <a href="/login" className="text-indigo-600 font-semibold">로그인</a>이 필요합니다.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {user?.avatar ? (
             <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
        ) : (
            <FaUserCircle className="w-8 h-8 text-gray-400" />
        )}
        <span className="font-semibold text-gray-800">{user?.name}</span>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="댓글을 입력하세요"
        rows={3}
        disabled={isPending}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isPending} 
        className="self-end px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
      >

        {isPending ? "등록 중..." : "댓글 등록"}
      </button>
    </form>
  );
};

export default CommentForm;