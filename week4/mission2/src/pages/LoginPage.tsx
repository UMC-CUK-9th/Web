import useForm from "../hooks/useForm";
import { type UserSigninInformation, validateSignin } from "../utils/validate";
import { BackButton } from "../components/BackButton";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath =
    location.state?.from || location.state?.location?.pathname || "/my";

  useEffect(() => {
    if (accessToken) {
      navigate(fromPath, { replace: true });
    }
  }, [navigate, accessToken, fromPath]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    try {
      await login(values);
      const fromPath = sessionStorage.getItem("redirectPath");
      if (fromPath) {
        sessionStorage.removeItem("redirectPath");
        navigate(fromPath, { replace: true });
      } else {
        navigate("/my");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  
  const isValid =
    !Object.values(errors || {}).some((e) => e.length > 0) &&
    Object.values(values).every((v) => v.trim() !== "");

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 mt-20">
      <div className="flex flex-col">
        <div className="relative flex w-[300px] items-center justify-center m-3">
          <div className="absolute left-0">
            <BackButton />
          </div>
          <h1 className="font-bold text-lg text-gray-800">로그인</h1>
        </div>

        <button
          type="button"
          className="bg-gray-400 font-medium text-base py-4 rounded-md cursor-pointer hover:bg-gray-500 transition-colors"
          onClick={handleGoogleLogin}
        >
          <div className="flex items-center justify-center gap-3">
            <span>구글 로그인</span>
          </div>
        </button>

        <div className="flex items-center justify-between mt-3">
          <div className="bg-black h-px w-[120px]" />
          <div className="text-center text-sm font-semibold text-gray-600">OR</div>
          <div className="bg-black h-px w-[120px]" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          type="email"
          className={`border w-[300px] p-2 rounded-md focus:border-[#807bff]
            ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-xs">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          type="password"
          className={`border w-[300px] p-2 rounded-md focus:border-[#807bff]
            ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-xs">{errors.password}</div>
        )}

      
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-3 rounded-md text-white font-medium text-sm transition-colors ${
            isValid
              ? "bg-[#4f4e6c] hover:bg-[#403f6a] cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
