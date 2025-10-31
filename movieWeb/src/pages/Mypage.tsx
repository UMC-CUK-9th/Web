import { useEffect, useState } from "react";

const Mypage = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const token = localStorage.getItem("accessToken");
    if (storedName && token) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold">
        {userName}님, 안녕하세요. 마이페이지 입니다.
      </h1>
    </div>
  );
};

export default Mypage;
