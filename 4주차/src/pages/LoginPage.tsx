import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";

export const LoginPage = () => {
    const navigate = useNavigate();

    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(values);

    };

    const isDisabled =
        Object.values(errors || {}).some(error => !!error) ||
        Object.values(values).some(value => value === "");

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
                    <h1 className="text-2xl font-bold text-white">로그인</h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* 이메일 입력 필드 */}
                    <div>
                        <input
                            {...getInputProps("email")}
                            className={`w-full p-3 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500
                                ${errors?.email && touched?.email ? "border-red-500" : "border-gray-600"}`}
                            type="email"
                            placeholder="이메일을 입력해주세요"
                        />
                        {errors?.email && touched?.email && (
                            <div className="mt-1 text-sm text-red-400">{errors.email}</div>
                        )}
                    </div>

                    {/* 비밀번호 입력 필드 */}
                    <div>
                        <input
                            {...getInputProps("password")}
                            className={`w-full p-3 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500
                                ${errors?.password && touched?.password ? "border-red-500" : "border-gray-600"}`}
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                        />
                        {errors?.password && touched?.password && (
                            <div className="mt-1 text-sm text-red-400">{errors.password}</div>
                        )}
                    </div>

                    {/* 로그인 버튼 */}
                    <button
                        type="submit"
                        disabled={isDisabled}
                        className="w-full py-3 mt-4 font-semibold text-white transition-colors bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    )
}