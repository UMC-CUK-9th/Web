import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import MovePage from "./MovePage";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const EmailInvalid = !!errors.email || watch("email") === "";
  const PasswordInvalid =
    !!errors.password ||
    !!errors.passwordCheck ||
    watch("password") === "" ||
    watch("passwordCheck") === "";

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const { passwordCheck, ...rest } = data;
      const response = await postSignup(rest);
      alert("회원가입이 완료되었습니다.");
      console.log(response);
      navigate("/");
    } catch (error) {
      let message = "에러가 발생했습니다.";

      if (error instanceof Error) {
        message = error.message;
      }

      alert(message);
    }
  };

  const next = () =>
    setStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev));
  const prev = () =>
    setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev));

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <div className="flex-none">
            <MovePage />
          </div>
          <div className="flex-1 text-center font-semibold text-2xl text-gray-900">
            회원가입
          </div>
          <div className="flex-none w-8" />
        </div>

        {/* 카드 */}
        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 p-8">
          {/* 스텝 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  이메일
                </label>
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full rounded-xl border px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition
                  ${
                    errors.email
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-200"
                  }`}
                  autoComplete="email"
                  autoFocus
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={next}
                  disabled={EmailInvalid}
                  className="flex-1 rounded-xl bg-gray-900 text-white py-3 font-semibold shadow-sm transition
                  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black"
                >
                  다음
                </button>
              </div>
            </div>
          )}

          {/* 스텝 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">
                  {watch("email") || "이메일"}
                </span>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  비밀번호
                </label>
                <div
                  className={`relative rounded-xl border transition ${
                    errors.password
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-gray-200"
                  }`}
                >
                  <input
                    id="password"
                    {...register("password")}
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl px-4 py-3 pr-12 text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-3 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showPw ? "숨기기" : "보기"}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="passwordCheck"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  비밀번호 확인
                </label>
                <div
                  className={`relative rounded-xl border transition ${
                    errors.passwordCheck
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-gray-200"
                  }`}
                >
                  <input
                    id="passwordCheck"
                    {...register("passwordCheck")}
                    type={showPw2 ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl px-4 py-3 pr-12 text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw2((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-3 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showPw2 ? "숨기기" : "보기"}
                  </button>
                </div>
                {errors.passwordCheck && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.passwordCheck.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={prev}
                  className="w-28 rounded-xl border border-gray-200 bg-white py-3 text-gray-900 font-medium shadow-sm hover:bg-gray-50"
                >
                  이전
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={PasswordInvalid}
                  className="flex-1 rounded-xl bg-gray-900 text-white py-3 font-semibold shadow-sm transition
                  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black"
                >
                  다음
                </button>
              </div>
            </div>
          )}

          {/* 스텝 3 */}
          {step === 3 && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">
                  {watch("email")}
                </span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <img
                  className="object-cover rounded-full w-28 h-28 border border-gray-200"
                  alt="프로필"/>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  이름
                </label>
                <input
                  id="name"
                  {...register("name")}
                  type="text"
                  placeholder="이름을 입력하세요"
                  className={`w-full rounded-xl border px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition
                  ${
                    errors.name
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-200"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={prev}
                  className="w-28 rounded-xl border border-gray-200 bg-white py-3 text-gray-900 font-medium shadow-sm hover:bg-gray-50"
                >
                  이전
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-gray-900 text-white py-3 font-semibold shadow-sm transition
                  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black"
                >
                  {isSubmitting ? "가입 처리중..." : "회원가입 완료"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
