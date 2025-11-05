import { useEffect, useState } from "react";
import { getMyInfo } from "../api/auth";
import { type ResponseMyInfoDto } from "../types/auth";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return <div>
    <h1
      className="font-bold text-3xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
      bg-clip-text text-transparent">
     {data?.data.name}님의 마이페이지
     <img src = {data?.data.avatar as string} alt="Profile" />
    </h1>
    <h1>{data?.data.email}</h1>
    <button
        onClick={handleLogout}
        className="cursor-pointer bg-blue-600 p-2 rounded-2xl text-white hover:bg-blue-500 transition-all">
        로그아웃
    </button>
  </div>;
};

export default MyPage;