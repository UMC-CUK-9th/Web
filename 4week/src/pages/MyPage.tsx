import { useEffect,useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const{logout} = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response : ResponseMyInfoDto = await getMyInfo();
            setData(response);
        };
        getData();
    }, []);
    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    // 데이터 로딩 중에는 간단한 로딩 메시지를 표시
    if (!data) {
        return <div className="flex items-center justify-center h-full">SomeoneElse</div>;
    }

    return (
        // flex를 이용해 내용을 화면 정중앙에 배치합니다.
        <div className="flex flex-col items-center justify-center h-full text-center">
            {/* 큰 제목 스타일 */}
            <h1 className="text-4xl font-bold mb-4">
                개인화면 입니다!!
            </h1>
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="User Avatar"className="w-32 h-32 rounded-full mb-4" />
            <h1>{data.data?.email}</h1>
            {/* 사용자 이름을 환영 메시지에 활용 */}
            <p className="text-xl text-gray-700">
                {data.data?.name}님, 환영합니다.
            </p>
            <button onClick={handleLogout} className="cursor-pointer mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;