import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePatchUsers from "../hooks/mutations/usePatchUsers";
import useImageUpload from "../hooks/mutations/useImageUpload";
import type { patchUsersProps } from "../apis/users";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();

  const { data } = useGetMyInfo(accessToken);

  // 수정 모드
  const [isEditing, setIsEditing] = useState(false);
  // 폼 입력
  const [nameInput, setNameInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  // 이미지 상태
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const { mutate: patchUserMutate } = usePatchUsers();

  const { mutate: uploadImageMutate, isPending: isUploading } = useImageUpload({
    onSuccessCallback: (res) => {
      const newImageUrl = res.data.imageUrl;  
      setAvatarUrl(newImageUrl);
      setAvatarPreview(newImageUrl);
    },
    onErrorCallback: () => {
      alert("이미지 업로드에 실패했습니다.");
      setAvatarPreview(data?.data?.avatar ?? null);
    },
  });

  // 수정 시작
  const handleStartEdit = () => {
    if (!data?.data) return;
    setNameInput(data.data.name);
    setBioInput(data.data.bio ?? "");
    setAvatarUrl(data.data.avatar ?? null);
    setAvatarPreview(data.data.avatar ?? null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setAvatarPreview(localPreview);

    const formData = new FormData();
    formData.append("file", file);
    uploadImageMutate(formData);
  };

  const handleSave = () => {
    if (nameInput.trim() === "") {
      alert("이름은 필수입니다.");
      return;
    }

    const payload: patchUsersProps = {
      name: nameInput,
      bio: bioInput,
      avatar: avatarUrl,
    };

    patchUserMutate(payload, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    // 핑크/보라 계열 배경
    <div className="container mx-auto bg-fuchsia-100 w-full">

      {isEditing ? (
        /* ---------- 수정 모드 ---------- */
        <div className="mt-12 w-full flex justify-center">
          <div className="bg-white w-[520px] rounded-3xl shadow-lg p-10 flex flex-col items-center">

            <h1 className="text-3xl font-bold mb-8">프로필 수정</h1>

            {/* 아바타 */}
            <label className="cursor-pointer mb-4">
              <img
                src={avatarPreview ?? "/default-avatar.png"}
                alt="avatar preview"
                className="w-32 h-32 rounded-full object-cover border shadow-sm"
              />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
            {isUploading && <p className="text-sm text-gray-500 mb-2">이미지 업로드 중...</p>}

            {/* 이름 */}
            <div className="w-full flex flex-col mb-4">
              <label className="text-sm text-gray-600 mb-1">이름</label>
              <input
                id="name"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            {/* Bio */}
            <div className="w-full flex flex-col mb-6">
              <label className="text-sm text-gray-600 mb-1">소개</label>
              <input
                id="bio"
                type="text"
                placeholder="소개를 입력하세요"
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <div className="flex gap-4 mt-2">
              <button
                onClick={handleSave}
                className="bg-blue-700 text-black px-6 py-2 rounded-lg hover:bg-purple-300 transition"
              >
                저장
        _     </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-200 text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ---------- 일반 모드 ---------- */
        <div className="mt-12 w-full flex justify-center">
          <div className="bg-white w-[520px] rounded-3xl shadow-lg p-10 flex flex-col items-center">

            {/* 아바타 */}
            <img
              src={data?.data?.avatar ?? "/default-avatar.png"}
              alt="profile image"
              className="w-32 h-32 rounded-full object-cover shadow-sm border mb-4"
            />

            <h1 className="text-3xl font-bold text-center mb-2">
              {data?.data?.name}님 반갑습니다 :)
            </h1>

            <p className="text-gray-600 mb-6">{data?.data?.email}</p>

            {data?.data?.bio && <p className="mb-4 text-gray-800">{data.data.bio}</p>}

            <div className="flex gap-4">
              <button
                // 핑크/보라 계열 버튼
                className="bg-purple-200 text-black px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={handleStartEdit}
        _     >
                수정하기
              </button>
              <button
                className="bg-gray-200 text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyPage;