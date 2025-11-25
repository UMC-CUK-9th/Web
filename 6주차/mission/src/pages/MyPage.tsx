import { useState, useEffect, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGetMyInfo } from "../hooks/useGetMyInfo";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";
import LoadingSpinner from "../components/LoadingSpinner";

const MyPage = () => {
  const { logout, accessToken } = useAuth();
  const navigate = useNavigate();

  const { data: myInfoData, isLoading } = useGetMyInfo(accessToken);
  const userInfo = myInfoData?.data;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateMyInfo(() => {
    setIsEditing(false);
  });

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");
      setBio(userInfo.bio || "");
      setAvatar(userInfo.avatar || "");
    }
  }, [userInfo]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name,
      bio: bio.trim() || "",
      avatar: avatar.trim() || "",
    };
    updateProfile(payload);
  };

  const handleCancel = () => {
    if (userInfo) {
      setName(userInfo.name || "");
      setBio(userInfo.bio || "");
      setAvatar(userInfo.avatar || "");
    }
    setIsEditing(false);
  };


  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-lg">
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4"
          >
            <div className="mb-4 flex justify-center">
              <img
                src={avatar}
                alt="프로필 미리보기"
                className="size-40 rounded-full bg-gray-700 object-cover"
              />
            </div>

            <label className="text-sm font-medium text-gray-400">
              프로필 이미지 URL
            </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="p-3 bg-gray-700 rounded border border-gray-600 text-white"
            />

            <label className="text-sm font-medium text-gray-400">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 (필수)"
              className="p-3 bg-gray-700 rounded border border-gray-600 text-white"
            />

            <label className="text-sm font-medium text-gray-400">
              한 줄 소개
            </label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="한 줄 소개 (옵션)"
              className="p-3 bg-gray-700 rounded border border-gray-600 text-white"
            />

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 cursor-pointer rounded-lg bg-gray-600 p-3 text-white hover:bg-gray-500 transition-all"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="flex-1 cursor-pointer rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-500 transition-all disabled:opacity-50"
              >
                저장
              </button>
            </div>
          </form>
        ) : (
          <div className="flex w-full flex-col items-center gap-y-4">
            <h1 className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text text-center text-3xl font-bold text-transparent">
              {userInfo?.name}님 환영합니다
            </h1>

            <img
              src={userInfo?.avatar || undefined} 
              alt="프로필 이미지"
              className="size-64 rounded-full mt-4 bg-gray-700 object-cover" 
            />

            <p className="text-center text-lg text-gray-300">
              {userInfo?.bio}
            </p>

            <p className="text-center text-gray-400">{userInfo?.email}</p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="cursor-pointer rounded-2xl bg-gray-600 p-3 px-5 text-white hover:bg-gray-500 transition-all"
              >
                설정
              </button>

              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-2xl bg-pink-600 p-3 px-5 text-white hover:bg-blue-500 transition-all"
              >
                로그아웃
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;