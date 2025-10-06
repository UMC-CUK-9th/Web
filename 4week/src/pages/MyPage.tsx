import { useEffect,useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response : ResponseMyInfoDto = await getMyInfo();
            setData(response);
        };
        getData();
    }, []);

    // 데이터 로딩 중에는 간단한 로딩 메시지를 표시
    if (!data) {
        return <div className="flex items-center justify-center h-full">...</div>;
    }

    return (
        // flex를 이용해 내용을 화면 정중앙에 배치합니다.
        <div className="flex flex-col items-center justify-center h-full text-center">
            {/* 큰 제목 스타일 */}
            <h1 className="text-4xl font-bold mb-4">
                개인화면 입니다!!
            </h1>
            {/* 사용자 이름을 환영 메시지에 활용 */}
            <p className="text-xl text-gray-700">
                {data.data.name}님, 환영합니다.
            </p>
        </div>
    );
};

export default MyPage;