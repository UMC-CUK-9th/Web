import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";
import { Link, useNavigate } from "react-router-dom";

// 아이콘 SVG 컴포넌트들 (이전과 동일)
const EyeIcon = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);
const EyeSlashIcon = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" />
    </svg>
);
const AvatarIcon = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);


// Zod 스키마
const step1Schema = z.object({
    email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
    password: z.string().min(8, { message: "비밀번호는 8자 이상 20자 이하" }),
    // 수정: 최소 길이 오류 메시지를 올바르게 수정
    passwordCheck: z.string().min(8, { message: "비밀번호는 8자 이상 20자 이하" }),
}).refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호와 값이 다릅니다",
    path: ["passwordCheck"],
});

const step2Schema = z.object({
    name: z.string().min(1, { message: "닉네임은 필수 입력 사항입니다." }),
});

type Step1FormFields = z.infer<typeof step1Schema>;
type Step2FormFields = z.infer<typeof step2Schema>;

const SignupPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [signupData, setSignupData] = useState<Partial<Step1FormFields>>({});
    
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);

    const { register: registerStep1, handleSubmit: handleSubmitStep1, formState: { errors: errorsStep1, isSubmitting: isSubmittingStep1 } } = useForm<Step1FormFields>({
        resolver: zodResolver(step1Schema),
        mode: "onChange",
    });
    
    const { register: registerStep2, handleSubmit: handleSubmitStep2, formState: { errors: errorsStep2, isSubmitting: isSubmittingStep2 } } = useForm<Step2FormFields>({
        resolver: zodResolver(step2Schema),
        mode: "onChange",
    });

    const onStep1Submit: SubmitHandler<Step1FormFields> = (data) => {
        setSignupData(data);
        setStep(2);
    };

    const onStep2Submit: SubmitHandler<Step2FormFields> = async (data) => {
        // 수정: 1단계 데이터가 없을 경우를 대비한 타입 가드 추가
        if (!signupData.email || !signupData.password) {
            alert("오류가 발생했습니다. 회원가입을 처음부터 다시 진행해주세요.");
            setStep(1);
            return; // 함수 실행 중단
        }

        const finalData = { email: signupData.email, password: signupData.password, name: data.name };
        console.log("API로 보낼 데이터:", finalData);
        try {
            await postSignup(finalData);
            alert("회원가입이 완료되었습니다!");
            navigate("/my");
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-3xl font-bold">회원가입</h1>
            
            {step === 1 && (
                <form onSubmit={handleSubmitStep1(onStep1Submit)} className="flex flex-col gap-3">
                    <input {...registerStep1('email')} type="email" placeholder="이메일" className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errorsStep1.email ? "border-red-500 bg-red-100" : "border-[#ccc]"}`} />
                    {errorsStep1.email && <div className="text-red-500 text-sm">{errorsStep1.email.message}</div>}
                    
                    <div className="relative">
                        <input {...registerStep1('password')} type={showPassword ? "text" : "password"} placeholder="비밀번호" className={`border w-full p-[10px] pr-10 focus:border-[#807bff] rounded-sm ${errorsStep1.password ? "border-red-500 bg-red-100" : "border-[#ccc]"}`}/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                    {errorsStep1.password && <div className="text-red-500 text-sm">{errorsStep1.password.message}</div>}

                    <div className="relative">
                        <input {...registerStep1('passwordCheck')} type={showPasswordCheck ? "text" : "password"} placeholder="비밀번호 확인" className={`border w-full p-[10px] pr-10 focus:border-[#807bff] rounded-sm ${errorsStep1.passwordCheck ? "border-red-500 bg-red-100" : "border-[#ccc]"}`}/>
                        <button type="button" onClick={() => setShowPasswordCheck(!showPasswordCheck)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                            {showPasswordCheck ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                    {errorsStep1.passwordCheck && <div className="text-red-500 text-sm">{errorsStep1.passwordCheck.message}</div>}

                    <button type="submit" disabled={isSubmittingStep1} className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 disabled:bg-gray-400">다음</button>
                </form>
            )}

            {step === 2 && (
                <>
                    <form onSubmit={handleSubmitStep2(onStep2Submit)} className="flex flex-col gap-3 items-center">
                        <AvatarIcon className="w-32 h-32 text-gray-400" />
                        <h2 className="text-xl font-semibold">프로필 설정</h2>
                        <p className="text-sm text-gray-500 mb-2">사용하실 닉네임을 입력해주세요.</p>

                        <input {...registerStep2('name')} type="text" placeholder="" className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errorsStep2.name ? "border-red-500 bg-red-100" : "border-[#ccc]"}`}/>
                        {errorsStep2.name && <div className="text-red-500 text-sm">{errorsStep2.name.message}</div>}

                        <button type="submit" disabled={isSubmittingStep2} className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 disabled:bg-gray-400">회원가입 완료</button>
                    </form>
                </>
            )}
            
            <div className="mt-4 text-sm">
                이미 계정이 있으신가요? <Link to="/login" className="text-blue-500 hover:underline">로그인</Link>
            </div>
        </div>
    );
};

export default SignupPage;