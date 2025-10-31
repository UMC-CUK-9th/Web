import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/users/me");

        if (response.data?.status && response.data?.data) {
          const userData = response.data.data as UserInfo;

          // ✅ 구글 로그인 사용자는 name, email이 없을 수 있음
          if (!userData.name && !userData.email) {
            setIsGoogleUser(true);
          } else {
            setUser(userData);
          }
        } else {
          // 서버에서 data가 비었을 때도 구글 로그인으로 판단
          setIsGoogleUser(true);
        }
      } catch (error) {
        console.error("내 정보 조회 실패:", error);
        // 401 등 오류 시에도 구글 로그인 사용자로 처리
        setIsGoogleUser(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <p className="m-4">불러오는 중...</p>;

  if (isGoogleUser) {
    return (
      <div className="m-6 text-center">
        <h1 className="text-2xl font-semibold mb-3">구글 로그인 사용자 👋</h1>
        <p className="text-gray-600">
          구글 로그인의 경우 회원정보가 제공되지 않습니다.
        </p>
      </div>
    );
  }

  if (!user)
    return (
      <p className="m-4 text-red-500">사용자 정보를 불러올 수 없습니다.</p>
    );

  return (
    <div className="m-6">
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

      <div className="mt-4 text-sm text-gray-500">
        <p>가입일: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</p>
        <p>
          마지막 수정:{" "}
          {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "-"}
        </p>
      </div>
    </div>
  );
};

export default Mypage;
