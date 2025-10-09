import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 flex justify-between items-center px-6 py-3 z-10">
        <h1
          className="text-lg font-bold text-purple-500 cursor-pointer hover:text-purple-500 transition"
          onClick={() => navigate("/")}
        >
          web
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 text-sm rounded-lg bg-pink-600 text-black hover:bg-pink-700 transition"
          >
            회원가입
          </button>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-4xl font-semibold">HOME</h2>
      </main>
    </div>
  );
};

export default HomePage;
