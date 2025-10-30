import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth"; 
import { FaUserCircle } from "react-icons/fa"; 
import { useAuth } from "../hooks/useAuth";

interface UserInfo {
 email: string;
name: string;
}

const MyPage = () => {
 const { logout } = useAuth();
 const [userInfo, setUserInfo] = useState<UserInfo | null>(null); 
 const [loading, setLoading] = useState(true); 

 useEffect(() => {
const getData = async () => {
 setLoading(true);
 try {
 const response = await getMyInfo(); 

 if (response.data) {
 setUserInfo({
 email: response.data.email,
 name: response.data.name,
 });
 } else {
 throw new Error("Error");
 }
 } catch (error) {
 console.error("Error", error);
 alert("Error");
 await logout();
 } finally {
 setLoading(false);
 }
 };
 getData();
 }, [logout]);

 const handleLogout = async () => {
 await logout();
 };


 if (loading) {
 return (
 <div className="flex items-center justify-center h-[calc(100vh-140px)]">
 <p className="text-xl text-slate-600">로딩 중...</p>
 </div>
 );
 }


 if (!userInfo) {
 return (
 <div className="flex items-center justify-center h-[calc(100vh-140px)]">
 <p className="text-xl text-red-500">Error</p>
 </div>
 );
 }

 return (
 <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] text-center px-4">
 <FaUserCircle className="text-indigo-200 text-8xl mb-4" />
<h1 className="text-4xl font-bold text-slate-800">
 {userInfo.name}
 </h1>
 <h2 className="text-xl text-slate-600 mt-2">{userInfo.email}</h2>

<button
 className="mt-8 px-6 py-3 text-lg font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-transform hover:scale-105"
 onClick={handleLogout}
 >
 로그아웃
 </button>
 </div>
 );
};

export default MyPage; 