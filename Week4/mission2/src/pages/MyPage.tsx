import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { FaUserCircle } from "react-icons/fa";

interface UserInfo {
  email: string;
  name: string;
}

const Mypage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setUserInfo({ email: response.data.email, name: response.data.name });
      } catch (error) {
        console.error("사용자 정보를 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div className="p-8">정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-lg bg-white p-8 shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b pb-4">마이페이지</h2>
        {userInfo ? (
          <div className="flex items-center gap-6">
            <FaUserCircle className="text-slate-300" size={80} />
            <div>
              <p className="text-2xl font-semibold text-slate-700">{userInfo.name}</p>
              <p className="text-md text-slate-500">{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <p>사용자 정보를 표시할 수 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Mypage;