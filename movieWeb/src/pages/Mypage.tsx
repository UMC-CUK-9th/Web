import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useUpdateUser } from "../hooks/useUpdateUser";

interface UserInfo {
  id?: number;
  name?: string | null;
  email?: string | null;
  bio?: string | null;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Mypage = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  const updateUser = useUpdateUser();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/users/me");

        if (response.data?.status && response.data?.data) {
          const userData = response.data.data as UserInfo;

          if (!userData.name && !userData.email) {
            setIsGoogleUser(true);
          } else {
            setUser(userData);
            setEditName(userData.name || "");
            setEditBio(userData.bio || "");
            setEditAvatar(userData.avatar || "");
          }
        } else {
          setIsGoogleUser(true);
        }
      } catch (error) {
        console.error("내 정보 조회 실패:", error);
        setIsGoogleUser(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSave = () => {
    updateUser.mutate(
      {
        name: editName || undefined,
        bio: editBio || undefined,
        avatar: editAvatar || undefined,
      },
      {
        onSuccess: (res) => {
          setUser(res.data);
          setIsEditing(false);
        },
      }
    );
  };

  if (loading) return <p className="m-4">불러오는 중...</p>;

  if (isGoogleUser) {
    return (
      <div className="m-6 text-center">
        <h1 className="text-2xl font-semibold mb-3">구글 로그인 사용자 👋</h1>
        <p className="text-gray-600">구글 로그인의 경우 회원정보가 제공되지 않습니다.</p>
      </div>
    );
  }

  if (!user) {
    return <p className="m-4 text-red-500">사용자 정보를 불러올 수 없습니다.</p>;
  }

  return (
    <div className="m-6">
      {/* 설정 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          설정 ⚙️
        </button>
      </div>

      {/* 프로필 표시 */}
      {!isEditing ? (
        <>
          <div className="flex items-center gap-4 mb-4">
            {user.avatar && (
              <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full border" />
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
      ) : (
        /* 수정 UI */
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
            ></textarea>
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
      )}

      {/* 날짜 정보 */}
      <div className="mt-6 text-sm text-gray-500">
        <p>가입일: {new Date(user.createdAt!).toLocaleDateString()}</p>
        <p>마지막 수정: {new Date(user.updatedAt!).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Mypage;
