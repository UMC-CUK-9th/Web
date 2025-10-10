import { useEffect, useState } from "react";

const Home = () => {
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
      {userName ? (
        <h1 className="text-2xl font-bold">
          {userName}님, 안녕하세요
        </h1>
      ) : (
        <h1 className="text-2xl font-bold">Home</h1>
      )}
    </div>
  );
};

export default Home;
