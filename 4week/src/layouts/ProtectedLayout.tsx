import { useAuth } from "../context/AuthContext.tsx";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // 1. Navbar를 임포트합니다.
import Footer from "../components/Footer.tsx";
// 'use' from "react"는 사용되지 않으므로 제거해도 됩니다.

const ProtectedLayout = () => {
 const { accessToken } = useAuth();

 // 2. 인증 체크 (기존과 동일)
 if (!accessToken) {
 return <Navigate to={"/login"} replace />;
 }

 // 3. 인증되었다면, HomeLayout과 동일한 구조로 Navbar와 Outlet을 렌더링합니다.
 return (
 <div className="h-dvh flex flex-col bg-gray-100">
 <Navbar /> {/* 네비게이션 바 */}

 {/* 메인 콘텐츠 (MyPage 등이 여기에 렌더링됨) */}
 <main className="flex-1 container mx-auto p-6">
 <Outlet />
 </main>
<Footer />
 </div>
 );
};

export default ProtectedLayout;