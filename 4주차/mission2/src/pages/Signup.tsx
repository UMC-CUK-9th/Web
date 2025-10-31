import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { postSignup } from "../apis/auth.ts";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const schema = z.object({
    email: z.string().email({message: "올바른 이메일 형식을 입력해주세요."}),
    password: z.string()
    .min(6, {message: "비밀번호는 6자 이상이어야 합니다.",
    }),
    passwordCheck: z.string()
    .min(6, {message: "비밀번호는 6자 이상이어야 합니다.",
    }),
    name: z.string().min(1, {message: "이름을 입력해주세요."}),
})
.refine((data)=> data.password === data.passwordCheck, {
        message: "비밀번호가 일치하지 않습니다.",
        path:["passwordCheck"],
    });

type FormFields = z.infer<typeof schema>;

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);

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


  useEffect(() => {
    const validateEmail = async () => setIsEmailValid(await trigger("email"));
    validateEmail();
  }, [emailValue, trigger]);

  useEffect(() => {
    const validatePassword = async () => setIsPasswordValid(await trigger(["password", "passwordCheck"]));
    validatePassword();
  }, [passwordValue, passwordCheckValue, trigger]);




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


  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
      <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl text-white">
        <div className="relative flex items-center justify-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 p-2 transition-colors rounded-full hover:bg-gray-700"
            aria-label="뒤로 가기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-2xl font-bold text-white">회원가입</h1>
        </div>
        {/* STEP 1: 이메일 */}
        {step === 1 && (
          <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleNext(); }}>
            <div>
              <input
                {...register("email")}
                className={`w-full p-3 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500
                  ${errors.email ? "border-red-500" : "border-gray-600"}`}
                type="email"
                placeholder="이메일을 입력해주세요"
              />
              {errors.email && (
                <div className="mt-1 text-sm text-red-400">{errors.email.message}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={!isEmailValid}
              className="w-full py-3 mt-4 font-semibold text-white transition-colors bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </form>
        )}
        {/* STEP 2: 비밀번호 */}
        {step === 2 && (
          <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleNext(); }}>
            <div className="flex-1 text-center font-semibold text-black mb-2 bg-sky-300 rounded">
              {watch("email")}
            </div>
            <div className="relative">
              <input
                {...register("password")}
                className={`w-full p-3 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500
                  ${errors.password ? "border-red-500" : "border-gray-600"}`}
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                onClick={() => setPasswordVisible(v => !v)}
                tabIndex={-1}
                aria-label={passwordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {passwordVisible ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
              </button>
            </div>
            {errors.password && (
              <div className="mt-1 text-sm text-red-400">{errors.password.message}</div>
            )}
            <div className="relative">
              <input
                {...register("passwordCheck")}
                className={`w-full p-3 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500
                  ${errors.passwordCheck ? "border-red-500" : "border-gray-600"}`}
                type={passwordCheckVisible ? "text" : "password"}
                placeholder="비밀번호 확인"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                onClick={() => setPasswordCheckVisible(v => !v)}
                tabIndex={-1}
                aria-label={passwordCheckVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {passwordCheckVisible ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
              </button>
            </div>
            {errors.passwordCheck && (
              <div className="mt-1 text-sm text-red-400">{errors.passwordCheck.message}</div>
            )}
            <button
              type="submit"
              disabled={!isPasswordValid}
              className="w-full py-3 mt-4 font-semibold text-white transition-colors bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </form>
        )}
        {/* STEP 3: 이름 & 프로필 */}
        {step === 3 && (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <img
              className="object-cover rounded-full w-32 h-32 border-2 border-red-300 mx-auto"
              alt="프로필"
            />
            <div>
              <input
                {...register("name")}
                className={`w-full p-3 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500
                  ${errors.name ? "border-red-500" : "border-gray-600"}`}
                type="text"
                placeholder="이름을 입력해주세요"
              />
              {errors.name && (
                <div className="mt-1 text-sm text-red-400">{errors.name.message}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 mt-4 font-semibold text-white transition-colors bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;