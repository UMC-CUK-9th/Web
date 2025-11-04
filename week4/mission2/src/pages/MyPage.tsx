import { getMyInfo } from "../apis/auth";
import { useEffect, useState } from "react";
import { type ResponseMyInfoDto } from "../types/auth";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import profileImg from "../assets/profile.jpg";


const Mypage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(()=>{
        const getData = async ()=>{
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    },[]);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    
    return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#FAFAFA] to-[#EAF4FF] text-gray-800">
      {/* 프로필 카드 */}
      <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center max-w-sm w-full">
        <h1 className="text-lg font-bold text-[#4B89DC] mb-4">
          {data?.data?.name ?? "사용자"} 입니다
        </h1>

        <img
          src={data?.data?.avatar ?? profileImg}   
          alt="프로필 이미지"
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleLogout}
          className="bg-[#4B89DC] text-black text-lg font-semibold px-6 py-3 rounded-xl shadow-md 
          hover:bg-[#3A70B5] active:bg-[#335E99] transition-all duration-200"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Mypage;