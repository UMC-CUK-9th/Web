import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../services/fetchMe";
import { useUpdateUser } from "../hooks/useUpdateUser";

const Mypage = () => {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 1000 * 60 * 5,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  const updateUser = useUpdateUser();

  // user 데이터 들어오면 수정 UI 초기화
  useEffect(() => {
    if (user) {
      setEditName(user.name || "");
      setEditBio(user.bio || "");
      setEditAvatar(user.avatar || "");
    }
  }, [user]);

  
  const handleSave = () => {
    updateUser.mutate(
      {
        name: editName || undefined,
        bio: editBio || undefined,
        avatar: editAvatar || undefined,
      },
      {
        onSuccess: () => {
          setIsEditing(false); 
        },
      }
    );
  };


  if (isLoading) return <p className="m-4">불러오는 중...</p>;
  if (isError || !user)
    return <p className="m-4 text-red-500">사용자 정보를 불러올 수 없습니다.</p>;

  return (
    <div className="m-6">
      {/* 설정 버튼 */}
      <div className="flex justify-end">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            설정
          </button>
        )}
      </div>

      {/* 수정 화면 */}
      {isEditing ? (
        <div className="mt-8 space-y-4">
          <div>
            <label className="block font-medium mb-1">이름</label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="이름 입력"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">소개 (bio)</label>
            <textarea
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="소개 입력"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">프로필 이미지 URL</label>
            <input
              value={editAvatar}
              onChange={(e) => setEditAvatar(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="이미지 URL 입력"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={updateUser.isPending}
              className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              {updateUser.isPending ? "저장 중..." : "저장"}
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        /* 기본 정보 */
        <>
          <div className="flex items-center gap-4 mb-4">
            {user.avatar && (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full border"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">{user.name}님, 안녕하세요</h1>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          {user.bio && (
            <div className="mt-4">
              <h2 className="font-semibold mb-1">소개</h2>
              <p className="text-gray-700">{user.bio}</p>
            </div>
          )}
        </>
      )}

      {/* 날짜 */}
      <div className="mt-6 text-sm text-gray-500">
        <p>가입일: {new Date(user.createdAt!).toLocaleDateString()}</p>
        <p>마지막 수정: {new Date(user.updatedAt!).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Mypage;
