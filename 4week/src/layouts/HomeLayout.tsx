import { Link, Outlet, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

const HomeLayout = () => {
    const navigate = useNavigate();
    const { removeItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    // localStorage에 토큰이 있는지 확인하여 로그인 상태를 판단합니다.
    const isLoggedIn = !!localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    const handleLogout = () => {
        removeItem(); // 로컬 스토리지에서 토큰 삭제
        alert("로그아웃 되었습니다.");
        navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
    };

    return (
        <div className="h-dvh flex flex-col bg-gray-100">
            {/* 네비게이션 바 */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        MyWebsite
                    </Link>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Link to="/my" className="text-gray-600 hover:text-blue-500">
                                    마이페이지
                                </Link>
                                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-blue-500">
                                    로그인
                                </Link>
                                <Link to="/signup" className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                                    회원가입
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* 메인 콘텐츠 */}
            <main className="flex-1 container mx-auto p-6">
                <Outlet />
            </main>

            {/* 푸터 */}
            <footer className="bg-gray-200 text-gray-600 text-center p-4">
                © 2025 MyWebsite. All Rights Reserved.
            </footer>
        </div>
    );
};

export default HomeLayout;