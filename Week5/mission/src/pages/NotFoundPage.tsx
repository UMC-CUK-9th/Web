import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] text-center px-4">
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
      <h2 className="text-6xl font-extrabold text-slate-800">404</h2>
      <p className="mt-2 text-2xl font-semibold text-slate-600">NotFound</p>
      <p className="mt-4 max-w-md text-slate-500"> NotFound</p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 text-lg font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-transform hover:scale-105"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;