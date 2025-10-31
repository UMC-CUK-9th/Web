import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signin } from "../../api/authAPI";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import AuthInput from "../../components/common/AuthInput";

// Zod 스키마
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("유효하지 않은 이메일 형식입니다."),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

// 타입 추론
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();

  const { setValue: setAccessToken } = useLocalStorage<string | null>(
    "accessToken",
    null
  );
  const { setValue: setRefreshToken } = useLocalStorage<string | null>(
    "refreshToken",
    null
  );

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // 로그인 요청
  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signin({
        email: data.email,
        password: data.password,
      });

      if (!result.status) throw new Error(result.message);

      // ✅ 토큰 저장
      setAccessToken(result.data.accessToken);
      setRefreshToken(result.data.refreshToken);
      localStorage.setItem("userName", result.data.name);
      window.dispatchEvent(new Event("authChange"));

      alert(`${result.data.name}님, 환영합니다!`);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message || "로그인 실패");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-50 px-6">
      <div className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6">
        {/* 타이틀 */}
        <div className="relative w-full max-w-sm mb-6 mt-4">
          <span
            onClick={() => navigate(-1)}
            className="absolute left-0 text-2xl cursor-pointer hover:text-green-500 transition"
          >
            &lt;
          </span>
          <h3 className="text-center text-2xl font-semibold">로그인</h3>
        </div>

        {/* 구글 로그인 버튼 */}
        <button
          type="button"
          className="w-full py-2 mb-5 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          <span className="text-gray-700 font-medium">Google 로그인</span>
        </button>

        {/* 구분선 */}
        <div className="flex items-center my-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* 이메일 & 비밀번호 입력 */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-2">
          <AuthInput
            type="email"
            placeholder="이메일을 입력해주세요"
            register={register("email")}
            error={errors.email?.message}
          />
          <AuthInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            register={register("password")}
            error={errors.password?.message}
          />

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-2 rounded-lg text-white transition ${
              isValid
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* 회원가입 링크 */}
        <p className="text-center text-sm text-gray-500 mt-5">
          아직 회원이 아니신가요?{" "}
          <a
            href="/signup"
            className="text-green-500 font-medium hover:underline"
          >
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
