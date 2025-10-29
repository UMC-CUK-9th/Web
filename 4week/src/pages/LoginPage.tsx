import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { UserSignInformation } from "../utils/validates.ts";
import { validateSignin } from "../utils/validates.ts";
import useForm from "../hooks/useForm.ts";
// import type { ResponseSigninDto } from "../types/auth.ts"; // 사용되지 않아 주석 처리
// import { postSignin } from "../apis/auth.ts"; // 사용되지 않아 주석 처리
// import { useLocalStorage } from "../hooks/useLocalStorage.ts"; // 사용되지 않아 주석 처리
// import { LOCAL_STORAGE_KEY } from "../constants/key.ts"; // 사용되지 않아 주석 처리
import { useAuth } from "../context/AuthContext.tsx";

// 눈 모양 아이콘 SVG
const EyeIcon = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

// 감긴 눈 모양 아이콘 SVG
const EyeSlashIcon = ({ ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" />
    </svg>
);


const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 가시성 상태

    useEffect(() => {
        if (accessToken) {
            navigate("/my");
        }
    }, [accessToken, navigate]);

    const { getInputProps, errors, touched, values } = useForm<UserSignInformation>({
        initialValues: { email: "", password: "" },
        validate: validateSignin,
    });

    const handleSubmit = async () => {
        await login(values);
    };

    

    const handleGoogleLogin = () =>{
        window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
    }

    const isInvalid = Object.values(errors).some(error => !!error) || Object.values(values).some(v => !v);

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-3xl font-bold">로그인</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-3">
                {/* 이메일 입력창 */}
                <input
                    {...getInputProps('email')}
                    type="email"
                    placeholder="이메일"
                    className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${errors.email && touched.email ? "border-red-500 bg-red-100" : "border-[#ccc]"}`}
                />
                {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}

                {/* 비밀번호 입력창 */}
                <div className="relative">
                    <input
                        {...getInputProps('password')}
                        type={showPassword ? "text" : "password"} // 상태에 따라 type 변경
                        placeholder="비밀번호"
                        className={`border w-full p-[10px] focus:border-[#807bff] rounded-sm pr-10 ${errors.password && touched.password ? "border-red-500 bg-red-100" : "border-[#ccc]"}`}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                </div>
                {errors.password && touched.password && <div className="text-red-500 text-sm">{errors.password}</div>}

                {/* 일반 로그인 버튼 */}
                <button
                    type="submit"
                    disabled={isInvalid}
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-400"
                >
                    로그인
                </button>

                {/* 구글 로그인 버튼 (수정됨) */}
                <button
                    type="button" // 1. type="button"으로 변경
                    onClick={handleGoogleLogin} // 구글 로그인 함수 연결
                    // 2. disabled 속성 제거
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                >
                    <div className="flex items-center justify-center gap-4">
                        {/* 3. 이미지 크기 고정 (예: w-6 h-6) */}
                        <img 
                            src={"/images/google_img.png"} 
                            className="w-6 h-6" // 크기 지정
                            alt="Google logo" 
                        />
                        <span>구글 로그인</span>
                    </div>
                </button>
            </form>
            <div className="mt-4 text-sm">
                계정이 없으신가요? <Link to="/signup" className="text-blue-500 hover:underline">회원가입</Link>
            </div>
        </div>
    );
};

export default LoginPage;