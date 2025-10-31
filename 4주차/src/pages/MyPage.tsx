import { useEffect, useState } from "react";
import { getMyInfo } from "../api/auth";
import { type ResponseMyInfoDto } from "../types/auth";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const navigate : NavigateFunction= useNavigate();
  const {logout} = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  

  useEffect(() => {
    const getData = async () => {
      const response: ResponseMyInfoDto = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/home");
  }

  return <div>
    <h1>
     {data?.data.name}님의 마이페이지
     <img src = {data?.data.avatar as string} alt="Profile" />
    </h1>
    <h1>{data?.data.email}</h1>

    <button className = "cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"  onClick = {handleLogout}> 로그아웃 </button>
  </div>;
};

export default MyPage;