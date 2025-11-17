
import { FaUserCircle } from "react-icons/fa"; 
import { useAuth } from "../hooks/useAuth";



const MyPage = () => {
 const { logout, user } = useAuth();

 const handleLogout = async () => {
 await logout();
 };


if (!user) {
 return (
 <div className="flex items-center justify-center h-[calc(100vh-140px)]">
 <p className="text-xl text-slate-600">로딩 중...</p>
 </div>
 );
 }

 return (
 <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] text-center px-4">
 <FaUserCircle className="text-indigo-200 text-8xl mb-4" />
<h1 className="text-4xl font-bold text-slate-800">
 {user.name}
 </h1>
 <h2 className="text-xl text-slate-600 mt-2">{user.email}</h2>

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