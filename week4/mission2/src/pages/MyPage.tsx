import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center text-center min-h-screen w-full bg-white overflow-x-hidden pt-28">
      
      
      <h1 className="text-3xl font-bold mb-4">
        {data?.data?.name}님 환영합니다
      </h1>
      <h2 className="text-xl text-gray-700 mb-6">{data?.data?.email}</h2>

      <button
        onClick={handleLogout}
        className="cursor-pointer bg-blue-300 rounded-md px-6 py-3 text-lg font-medium hover:scale-95 transition-transform"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
