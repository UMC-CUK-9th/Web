import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { postSignup } from "../apis/auth.ts";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUser, FaEnvelope, FaLock, FaUserCircle } from "react-icons/fa";

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

const SignUpPage = () => {
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
    const validateEmail = async () => setIsEmailValid(await trigger("email"));
    validateEmail();
  }, [emailValue, trigger]);

  useEffect(() => {
    const validatePassword = async () => setIsPasswordValid(await trigger(["password", "passwordCheck"]));
    validatePassword();
  }, [passwordValue, passwordCheckValue, trigger]);

  useEffect(() => {
    const validateName = async () => setIsNameValid(await trigger("name"));
    validateName();
  }, [nameValue, trigger]);


  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data; 
    try {
      await postSignup(rest);
      alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleNext = () => {
    if (step === 1 && isEmailValid) setStep(2);
    else if (step === 2 && isPasswordValid) setStep(3);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
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
        <h2 className="text-3xl font-bold text-slate-800 mb-8">회원가입</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
          noValidate
        >
          {step === 1 && (
            <>
              <p className="font-semibold text-slate-700 mb-4">이메일을 입력해주세요.</p>
              <div className="relative w-full">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  {...register("email")}
                  className={`w-full py-3 pl-12 pr-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
                    errors?.email ? "border-red-500 bg-red-50" : "border-slate-300"
                  }`}
                  type="email"
                  placeholder="email@example.com"
                />
              </div>
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>}
              
              <button
                type="button"
                onClick={handleNext}
                disabled={!isEmailValid}
                className={`w-full py-3 rounded-lg text-lg font-semibold mt-8 transition-all duration-300 ${
                  !isEmailValid
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
                }`}
              >
                다음
              </button>
            </>
          )}

          {step === 2 && (
             <>
               <p className="font-semibold text-slate-700 mb-4">비밀번호를 설정해주세요.</p>
               <div className="relative w-full">
                 <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input
                    {...register("password")}
                    className={`w-full py-3 pl-12 pr-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
                      errors?.password ? "border-red-500 bg-red-50" : "border-slate-300"
                    }`}
                    type="password"
                    placeholder="비밀번호 (8자 이상)"
                  />
               </div>
               {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>}
               
               <div className="relative w-full mt-4">
                 <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input
                    {...register("passwordCheck")}
                    className={`w-full py-3 pl-12 pr-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
                      errors?.passwordCheck ? "border-red-500 bg-red-50" : "border-slate-300"
                    }`}
                    type="password"
                    placeholder="비밀번호 확인"
                  />
               </div>
               {errors.passwordCheck && <div className="text-red-500 text-sm mt-1">{errors.passwordCheck.message}</div>}

               <div className="flex gap-3 mt-8 w-full">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex-1 py-3 rounded-lg text-lg font-semibold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                  >
                    이전
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isPasswordValid}
                    className={`flex-1 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${
                      !isPasswordValid
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
                    }`}
                  >
                    다음
                  </button>
               </div>
             </>
          )}

          {step === 3 && (
            <>
              <p className="font-semibold text-slate-700 mb-4">사용하실 닉네임을 알려주세요.</p>
              <div className="flex flex-col items-center w-full">
                <FaUserCircle className="text-slate-200 text-8xl mb-4" />
                <div className="relative w-full">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("name")}
                    className={`w-full py-3 pl-12 pr-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
                      errors?.name ? "border-red-500 bg-red-50" : "border-slate-300"
                    }`}
                    type="text"
                    placeholder="닉네임"
                  />
                </div>
              </div>
              {errors.name && <div className="text-red-500 text-sm mt-1 self-start">{errors.name.message}</div>}

              <div className="flex gap-3 mt-8 w-full">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 py-3 rounded-lg text-lg font-semibold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                >
                  이전
                </button>
                <button
                  type="submit"
                  disabled={!isNameValid || isSubmitting}
                  className={`flex-1 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ${
                    !isNameValid || isSubmitting
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transform hover:-translate-y-1 shadow-lg shadow-indigo-200"
                  }`}
                >
                  {isSubmitting ? "가입 처리 중..." : "회원가입 완료"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;