

import useForm from "../hooks/useForm";
import { type UserSigninInformation, validateSignin } from "../utils/validate";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query"; 
import { postSignin } from "../apis/auth"; 
import { isAxiosError } from "axios"; 

const LoginPage = () => {
  const { setAuthData, accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = location.state?.from?.pathname || "/my";

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, error, getInputProps } = useForm<UserSigninInformation>({
    initialValue: { email: "", password: "" },
    validate: validateSignin,
  });


  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: postSignin,
    onSuccess: (response) => {
      const { data: responseData } = response;
      if (responseData) {
        const { accessToken, refreshToken } = responseData;
        setAuthData(accessToken, refreshToken).then(() => {
          navigate(fromPath, { replace: true });
        });
      }
    },
    onError: (error) => {
      console.error("로그인 페이지에서 오류 감지:", error);
      let message = "로그인 실패. 이메일과 비밀번호를 확인해주세요.";
      if (isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }
      alert(message);
    },
  });

  const handleSubmit = async () => {
loginMutate(values);
  };

  const handleGoogleLogin = () => {
    sessionStorage.setItem("loginRedirectPath", fromPath);
    window.location.href =
      import.meta.env.VITE_APP_BASE_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(error || {}).some((e) => e.length > 0) ||
    values.email === "" ||
    values.password === "" ||
    isPending;

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
              error?.email ? "border-red-500 bg-red-50" : "border-slate-300"
            }`}
            type="email"
            placeholder="이메일"
          />
        </div>
        {error?.email && (
          <div className="text-red-500 text-sm mb-4 self-start">
            {error.email}
          </div>
        )}

        <div className="relative w-full">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            {...getInputProps("password")}
            className={`w-full py-3 pl-12 pr-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
              error?.password ? "border-red-500 bg-red-50" : "border-slate-300"
            }`}
            type="password"
            placeholder="비밀번호"
          />
        </div>
        {error?.password && (
          <div className="text-red-500 text-sm mt-1 self-start">
            {error.password}
          </div>
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

        <button
          type="button"
          onClick={handleGoogleLogin}
          className={`w-full py-3 rounded-lg text-lg font-semibold mt-8 transition-all duration-300`}
        >
          <div className="flex items-center justify-center gap-4">
            <img src={"/images/google.png"} alt="Google Logo img" />
            <span> 구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;