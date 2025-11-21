import { useState } from "react";
import usePostComment from "../../hooks/mutations/usePostComment";

interface Props{
  lpid: string;
}

const LpCommentForm = ({lpid}: Props) => {
  const [content, setContent] = useState("");
  const {mutate} = usePostComment();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({lpid, content}, {
      onSuccess: () => {setContent("");}
    });
  }
  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="댓글을 남겨주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-600 cursor-pointer"
        >
          작성
        </button>
      </div>
    </form>
  );
};

export default LpCommentForm;