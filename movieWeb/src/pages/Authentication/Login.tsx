import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { signIn } from "../../api/authAPI";

const Login = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, isValid } = useForm({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setServerError("");

    try {
      const result = await signIn(values.email, values.password);

      if (!result.status) throw new Error(result.message);

      // 토큰 저장
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);
      localStorage.setItem("userName", result.data.name);

      alert(`${result.data.name}님, 환영합니다`);
      navigate("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setServerError(error.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-50 px-6">
      <div className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6">
        <div className="relative w-full max-w-sm mb-6 mt-4">
          <span
            onClick={() => navigate(-1)}
            className="absolute left-0 text-2xl cursor-pointer hover:text-green-500 transition"
          >
            &lt;
          </span>
          <h3 className="text-center text-2xl font-semibold">로그인</h3>
        </div>

        {/* 구글 로그인 */}
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

        {/* 이메일 로그인 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
          <div>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={values.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-green-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={values.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-green-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {serverError && (
            <p className="text-red-500 text-sm text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-2 rounded-lg text-white transition ${
              isValid && !loading
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          아직 회원이 아니신가요?{" "}
          <a href="/signup" className="text-green-500 font-medium hover:underline">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
