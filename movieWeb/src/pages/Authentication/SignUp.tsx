import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signup } from "../../api/authAPI";
import { Eye, EyeOff, UserCircle, Mail } from "lucide-react";
import AuthInput from "../../components/common/AuthInput";

// Zod 스키마
const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .email("올바른 이메일 형식을 입력해주세요."),
    password: z
      .string()
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPw: z.string().min(1, "비밀번호를 다시 입력해주세요."),
    nickname: z.string().min(1, "닉네임을 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPw, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPw"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");
  const confirmPw = watch("confirmPw");
  const nickname = watch("nickname");

  // 회원가입 요청
  const onSubmit = async (data: SignupFormData) => {
    try {
      const result = await signup({
        name: data.nickname,
        email: data.email,
        password: data.password,
      });

      if (!result.status) throw new Error(result.message);

      alert("회원가입이 완료되었습니다.");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setServerError(error.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-50 px-6">
      <div className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-center text-2xl font-semibold mb-6">회원가입</h3>

        {/* 1: 이메일 */}
        {step === 1 && (
          <>
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
              <span className="text-gray-700 font-medium">Google로 시작하기</span>
            </button>

            {/* 구분선 */}
            <div className="flex items-center my-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <AuthInput
              type="email"
              placeholder="이메일을 입력해주세요"
              register={register("email")}
              error={errors.email?.message}
            />

            <button
              onClick={async () => {
                const ok = await trigger("email");
                if (ok) setStep(2);
              }}
              disabled={!email || !!errors.email}
              className={`mt-4 w-full py-2 rounded-lg text-white transition ${
                !email || errors.email
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              다음
            </button>
          </>
        )}

        {/* 2: 비밀번호 */}
        {step === 2 && (
          <div className="flex flex-col gap-3">
            <p className="text-gray-600 text-sm mb-1 flex items-center gap-1">
              <Mail size={16} className="text-gray-500" />
              {email}
            </p>

            {/* 비밀번호 */}
            <div className="relative">
              <AuthInput
                type={showPw ? "text" : "password"}
                placeholder="비밀번호 (6자 이상)"
                register={register("password")}
                error={errors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* 비밀번호 확인 */}
            <div className="relative">
              <AuthInput
                type={showConfirm ? "text" : "password"}
                placeholder="비밀번호 재확인"
                register={register("confirmPw")}
                error={errors.confirmPw?.message}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              disabled={!password || !confirmPw || !!errors.password || !!errors.confirmPw}
              onClick={async () => {
                const ok = await trigger(["password", "confirmPw"]);
                if (ok) setStep(3);
              }}
              className={`mt-2 w-full py-2 rounded-lg text-white transition ${
                password && confirmPw && !errors.password && !errors.confirmPw
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </div>
        )}

        {/* 3: 프사, 닉네임 */}
        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              {email}
            </p>

            <div className="flex flex-col items-center mb-3">
              <UserCircle size={150} strokeWidth={0.2} className="text-gray-400" />
            </div>

            <AuthInput
              type="text"
              placeholder="닉네임을 입력해주세요"
              register={register("nickname")}
              error={errors.nickname?.message}
            />

            {serverError && (
              <p className="text-red-500 text-sm text-center">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={!nickname || !!errors.nickname}
              className={`mt-3 w-full py-2 rounded-lg text-white transition ${
                nickname && !errors.nickname
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
