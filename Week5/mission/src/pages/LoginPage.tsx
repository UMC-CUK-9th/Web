import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import z from "zod";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../apis/auth";
import { isAxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";


const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다!" }), 
  password: z
    .string()
    .min(8, { message: "비밀번호는 8-20자 사이로 입력해주세요" }) 
    .max(20, { message: "비밀번호는 8-20자 사이로 입력해주세요" }),
});


type LoginFormFields = z.infer<typeof loginSchema>;

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }, 
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", 
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutate } = useMutation({
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
      console.error("로그인 오류:", error);
      let message = "로그인 실패. 이메일과 비밀번호를 확인해주세요.";
      if (isAxiosError(error) && error.response?.data?.message) {
        message = String(error.response.data.message);
      }
      alert(message);
    },
  });


  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    loginMutate(data);
  };

  const handleGoogleLogin = () => {
    sessionStorage.setItem("loginRedirectPath", fromPath);
    window.location.href =
      import.meta.env.VITE_APP_BASE_URL + "/v1/auth/google/login";
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">

          <div className="relative w-full mb-4">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              {...register("email")} 
              className={`w-full py-3 pl-12 pr-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
                errors.email ? "border-red-500 bg-red-50" : "border-slate-300"
              }`}
              type="email"
              placeholder="이메일"
            />
          </div>

          {errors.email && (
            <div className="text-red-500 text-sm mb-4 self-start">
              {errors.email.message}
            </div>
          )}

          <div className="relative w-full">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              {...register("password")} 
              className={`w-full py-3 pl-12 pr-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
                errors.password ? "border-red-500 bg-red-50" : "border-slate-300"
              }`}
              type="password"
              placeholder="비밀번호"
            />
          </div>
          {errors.password && (
            <div className="text-red-500 text-sm mt-1 self-start">
              {errors.password.message}
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-lg text-lg font-semibold mt-8 transition-all duration-300 ${
              !isValid || isSubmitting
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transform hover:-translate-y-1 shadow-lg shadow-indigo-200"
            }`}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg text-lg font-medium mt-4 
                     border border-slate-300 bg-white text-slate-700 
                     hover:bg-slate-50 transition-all duration-300 
                     flex items-center justify-center gap-3"
        >
          <img
            src={"/images/google.png"}
            alt="Google"
            className="w-6 h-6" 
          />
          <span>구글 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;