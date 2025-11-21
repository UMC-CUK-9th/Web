import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { type UserSigninInformatin, validateSignin } from "../utils/validate";
import MovePage from "../pages/MovePage";
import { useLogin } from "../hooks/mutations/useLogin";

const LoginPage = () => {
  const navigate = useNavigate();

  // ✅ 토큰 상태는 AuthContext에서 가져와서 로그인되어 있으면 리다이렉트
  const { accessToken } = useAuth();

  // ✅ 로그인 요청은 useLogin 훅으로 (1번째 코드의 로직)
  const {
    mutate: loginMutate,
    isPending,
    authError,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (accessToken) navigate("/");
  }, [navigate, accessToken]);

  const { values, error, touch, getInputProps } =
    useForm<UserSigninInformatin>({
      initialValue: { email: "", password: "" },
      validate: validateSignin,
    });

  const isDisabled =
    Object.values(error || {}).some((e) => e.length > 0) ||
    Object.values(values).some((v) => v === "");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled || isPending) return;
    // ✅ 1번째 코드의 loginMutate 사용
    loginMutate(values);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + `/v1/auth/google/login`;
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 헤더 영역 */}
        <div className="flex items-center mb-6">
          <div className="flex-none">
            <MovePage />
          </div>
          <div className="flex-1 text-center font-semibold text-2xl text-gray-900">
            로그인
          </div>
          <div className="flex-none w-8" />
        </div>

        {/* 카드 */}
        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 p-8">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* 이메일 */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                이메일
              </label>
              <input
                id="email"
                {...getInputProps("email")}
                type="email"
                placeholder="name@example.com"
                className={`w-full rounded-xl border px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition
                ${
                  error?.email && touch?.email
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-200"
                }`}
                autoComplete="email"
                autoFocus
              />
              {error?.email && touch?.email && (
                <p className="mt-1 text-xs text-red-500">{error.email}</p>
              )}
            </div>

            {/* 비밀번호 */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                비밀번호
              </label>
              <div
                className={`relative rounded-xl border transition ${
                  error?.password && touch?.password
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-gray-200"
                }`}
              >
                <input
                  id="password"
                  {...getInputProps("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 pr-12 text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 pr-3 text-sm text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                >
                  {showPassword ? "숨기기" : "보기"}
                </button>
              </div>
              {error?.password && touch?.password && (
                <p className="mt-1 text-xs text-red-500">{error.password}</p>
              )}
            </div>

            {/* 서버 인증 에러 표시 (1번째 코드에서 가져옴) */}
            {authError && (
              <p className="text-xs text-red-500 text-center">{authError}</p>
            )}

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isDisabled || isPending}
              className="w-full rounded-xl bg-gray-900 text-white py-3 text-base font-semibold
              shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black"
            >
              {isPending ? "로그인 중..." : "로그인"}
            </button>

            {/* 구글 로그인 */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full rounded-xl bg-white border border-gray-200 py-3 text-gray-900 font-medium
              shadow-sm hover:bg-gray-50 active:bg-gray-100 transition"
            >
              <div className="flex items-center justify-center gap-2">
                <img
                  src={"/images/google.png"}
                  alt="구글 로고"
                  className="size-6 rounded-sm"
                />
                <span>Google 로그인</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
