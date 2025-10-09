import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { postSignup } from "../apis/auth.ts";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z.string(),
    name: z.string().min(1, { message: "닉네임을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passwordCheckValue = watch("passwordCheck");
  const nameValue = watch("name");

  
  useEffect(() => {
    const validateEmail = async () => {
      const valid = await trigger("email");
      setIsEmailValid(valid);
    };
    validateEmail();
  }, [emailValue]);

  useEffect(() => {
    const validatePassword = async () => {
      const valid = await trigger(["password", "passwordCheck"]);
      setIsPasswordValid(valid);
    };
    validatePassword();
  }, [passwordValue, passwordCheckValue]);

  useEffect(() => {
    const validateName = async () => {
      const valid = await trigger("name");
      setIsNameValid(valid);
    };
    validateName();
  }, [nameValue]);


  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    try {
      const response = await postSignup(rest);
      console.log(response);
      alert("회원가입이 완료되었습니다 🎉");
      navigate("/");
    } catch (error) {
      alert("회원가입 실패 😢 다시 시도해주세요.");
    }
  };

  const handleNext = async () => {
    if (step === 1 && isEmailValid) setStep(2);
    else if (step === 2 && isPasswordValid) setStep(3);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 flex justify-between items-center px-8 py-3 z-10">
        <h1 className="text-lg font-bold text-purple-500">web</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition">
            로그인
          </button>
          <button className="px-4 py-2 text-sm rounded-lg bg-pink-600 text-black hover:bg-pink-700 transition">
            회원가입
          </button>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-2xl px-10 py-12 flex flex-col items-center w-[380px] mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">회원가입</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full" noValidate>
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <input
                  {...register("email")}
                  className={`border w-full p-3 rounded-md focus:ring-2 focus:ring-pink-400 outline-none transition ${
                    errors?.email ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  type="email"
                  placeholder="이메일을 입력하세요"
                />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isEmailValid}
                  className={`w-full py-3 rounded-md text-lg font-medium mt-6 transition-all duration-200 ${
                    !isEmailValid
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "!bg-[#ff4da6] !text-white hover:!bg-[#ff2e91] active:!bg-[#e60073]"
                  }`}
                >
                  다음
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <div className="text-sm text-gray-600 mb-2">{emailValue}</div>
                <input
                  {...register("password")}
                  className={`border w-full p-3 rounded-md focus:ring-2 focus:ring-pink-400 outline-none transition ${
                    errors?.password ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                />
                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>}

                <input
                  {...register("passwordCheck")}
                  className={`border w-full p-3 rounded-md focus:ring-2 focus:ring-pink-400 outline-none transition ${
                    errors?.passwordCheck ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                />
                {errors.passwordCheck && (
                  <div className="text-red-500 text-sm mt-1">{errors.passwordCheck.message}</div>
                )}

                <div className="flex gap-2 mt-6">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex-1 py-3 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                  >
                    이전
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isPasswordValid}
                    className={`flex-1 py-3 rounded-md text-lg font-medium transition-all duration-200 ${
                      !isPasswordValid
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "!bg-[#ff4da6] !text-white hover:!bg-[#ff2e91] active:!bg-[#e60073]"
                    }`}
                  >
                    다음
                  </button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <div className="flex flex-col items-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-4xl text-gray-400">
                    👤
                  </div>
                </div>

                <input
                  {...register("name")}
                  className={`border w-full p-3 rounded-md focus:ring-2 focus:ring-pink-400 outline-none transition ${
                    errors?.name ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  type="text"
                  placeholder="닉네임을 입력하세요"
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>}

                <div className="flex gap-2 mt-6">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex-1 py-3 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                  >
                    이전
                  </button>
                  <button
                    type="submit"
                    disabled={!isNameValid || isSubmitting}
                    className={`flex-1 py-3 rounded-md text-lg font-medium transition-all duration-200 ${
                      !isNameValid
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "!bg-[#ff4da6] !text-white hover:!bg-[#ff2e91] active:!bg-[#e60073]"
                    }`}
                  >
                    회원가입 완료
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
