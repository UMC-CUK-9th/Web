import { postSignin } from "../apis/auth.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { type UserSigninInformation, validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import type { AxiosError } from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const { values, error, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: { email: "", password: "" },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
      alert(`로그인 실패: ${errorMessage}`);
    }
  };

  const isDisabled =
    Object.values(error || {}).some((e) => e.length > 0) ||
    values.email === "" ||
    values.password === "";

  return (
    <div className="flex items-center justify-center w-full py-12 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 flex flex-col items-center w-full max-w-md relative">
        <button
          onClick={() => navigate("/")}
          className="absolute left-5 top-5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">로그인</h2>
        <p className="text-slate-500 mb-8"></p>

        <div className="relative w-full mb-4">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            {...getInputProps("email")}
            className={`w-full py-3 pl-12 pr-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
              error?.email && touched?.email ? "border-red-500 bg-red-50" : "border-slate-300"
            }`}
            type="email"
            placeholder="이메일"
          />
        </div>
        {error?.email && touched?.email && (
          <div className="text-red-500 text-sm mb-4 self-start">{error.email}</div>
        )}

        <div className="relative w-full">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            {...getInputProps("password")}
            className={`w-full py-3 pl-12 pr-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
              error?.password && touched?.password ? "border-red-500 bg-red-50" : "border-slate-300"
            }`}
            type="password"
            placeholder="비밀번호"
          />
        </div>
        {error?.password && touched?.password && (
          <div className="text-red-500 text-sm mt-1 self-start">{error.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full py-3 rounded-lg text-lg font-semibold mt-8 transition-all duration-300 ${
            isDisabled
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transform hover:-translate-y-1 shadow-lg shadow-indigo-200"
          }`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;