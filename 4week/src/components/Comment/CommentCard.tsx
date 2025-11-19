import { useParams } from "react-router-dom";
import usePatchComment from "../../hooks/mutations/usePatchComment";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import useDeleteComment from "../../hooks/mutations/useDeleteLpComment";
import type { RequestCommentDto } from "../../types/comment";

interface CommentsProps {
  id: number;
  content: string;
  author: {
    name: string;
    avatar: string | null;
  };
}

const CommentCard = ({ id, content, author }: CommentsProps) => {
  const { lpid } = useParams();
  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  const isAuthor = me?.data.name === author.name;

  const [isEditing, setIsEditing] = useState(false);
  const [updateContent, setUpdateContent] = useState(content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mutate: editCommentMutate } = usePatchComment(Number(lpid), id);
  const { mutate: deleteCommentMutate } = useDeleteComment(Number(lpid), id);

  const handleEditSubmit = () => {
    if (updateContent.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    const payload: RequestCommentDto = { content: updateContent };

    editCommentMutate(payload, {
      onSuccess: () => {
        setIsEditing(false);
        setIsMenuOpen(false);
      },
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdateContent(content);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteCommentMutate(undefined, {
        onSuccess: () => {
          setIsMenuOpen(false);
        },
      });
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-3 mt-5 p-4 bg-[#7A3604] border border-[#f6d99c] rounded-2xl text-white relative">

      {/* 프로필 / 내용 */}
      <div className="flex items-start gap-3">
        {/* avatar */}
        <div className="w-10 h-10 rounded-md bg-gray-600 flex-shrink-0 overflow-hidden">
          {author.avatar ? (
            <img src={author.avatar} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-500" />
          )}
        </div>

        {/* 이름 + 내용 */}
        <div className="flex-1">
          <span className="text-sm font-bold text-white">{author.name}</span>

          {!isEditing ? (
            <p className="text-sm text-[#f5e6c8] mt-1">{content}</p>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <input
                type="text"
                value={updateContent}
                onChange={(e) => setUpdateContent(e.target.value)}
                className="w-full px-3 py-2 bg-[#9a4e09] text-white placeholder-gray-200 rounded-lg border border-[#dca46d] focus:outline-none"
                placeholder="내용을 입력하세요"
              />

              <div className="flex gap-3 mt-1">
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-1 bg-[#f1c27d] text-[#4b2500] rounded-lg text-sm shadow-sm hover:bg-[#e8b46a]"
                >
                  저장
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-1 bg-[#d8bba0] text-[#4b2500] rounded-lg text-sm shadow-sm hover:bg-[#caa98f]"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 메뉴 버튼 */}
        {isAuthor && !isEditing && (
          <div className="absolute top-3 right-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-[#d8bba0] hover:bg-[#caa98f] text-[#4b2500] shadow"
            >
              ⋮
            </button>

            {isMenuOpen && (
              <div className="absolute top-10 right-0 w-24 bg-[#fff4e1] border border-[#dca46d] rounded-md shadow-xl z-20">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-[#4b2500] hover:bg-[#ffe5c2]"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-[#ffe5c2]"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;