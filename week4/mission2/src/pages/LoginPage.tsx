import useForm from "../hooks/useForm";
import { type UserSigninInformatin, validateSignin } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; 
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";


const LoginPage = () => {
  const {login,accessToken} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(accessToken){
      navigate("/")
    }
  },[navigate, accessToken]);
 

  const { values, error, touched, getInputProps } = useForm<UserSigninInformatin>({
    initialValue: { email: "", password: "" },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
  await login(values);
  navigate("/my");
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + `/v1/auth/google/login`;
  };

  const isDisabled =
    Object.values(error || {}).some((e) => e.length > 0) ||
    values.email === "" ||
    values.password === "";

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* 상단 네비게이션 */}
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 flex justify-between items-center px-8 py-3 z-10">
        <h1
          className="text-lg font-bold text-purple-500 cursor-pointer hover:text-blue-700 transition"
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

      {/* 로그인 박스 */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-2xl px-10 py-12 flex flex-col items-center w-[380px] mt-10 relative">


          <button
            onClick={() => navigate(-1)}
            className="absolute left-5 top-5 text-gray-400 hover:text-gray-700 transition"
          >
            <FaArrowLeft size={22} />
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 mb-8 mt-2">
            로그인
          </h2>

          {/* 이메일 입력 */}
          <input
            {...getInputProps("email")}
            className={`border w-full p-3 rounded-md focus:ring-2 focus:ring-pink-400 outline-none transition
              ${
                error?.email && touched?.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            type="email"
            placeholder="이메일을 입력하세요"
          />
          {error?.email && touched?.email && (
            <div className="text-red-500 text-sm mt-1 self-start">
              {error.email}
            </div>
          )}

          {/* 비밀번호 입력 */}
          <input
            {...getInputProps("password")}
            className={`border w-full p-3 rounded-md mt-4 focus:ring-2 focus:ring-pink-400 outline-none transition
              ${
                error?.password && touched?.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
          {error?.password && touched?.password && (
            <div className="text-red-500 text-sm mt-1 self-start">
              {error.password}
            </div>
          )}

          {/* 로그인 버튼 */}
          <button
  type="button"
  onClick={handleSubmit}
  disabled={isDisabled}
  className={`w-full py-3 rounded-md text-lg font-medium mt-6 transition-all duration-200
    ${
      isDisabled
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "!bg-pink-500 !text-white hover:!bg-pink-600 active:!bg-pink-700"
    }`}
>
  로그인
</button>

<button
  type="button"
  onClick={handleGoogleLogin}
  className={`w-full py-3 rounded-md text-lg font-medium mt-6 transition-all duration-200
    ${
      isDisabled
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "!bg-pink-500 !text-white hover:!bg-pink-600 active:!bg-pink-700"
    }`}
>
  구글로그인
</button>

          {/* 회원가입 안내 */}
          <p className="text-gray-500 text-sm mt-6">
            아직 회원이 아니신가요?{" "}
            <span
              className="text-pink-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;