import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import GoogleButton from "../components/googleButton";

export default function LoginPage() {
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const { setItem: setAccessItem } = useLocalStorage("accessToken");
  const { setItem: setRefreshItem } = useLocalStorage("refreshToken");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await postSignin(values);
      console.log(data.name);
      setAccessItem(data.accessToken);
      setRefreshItem(data.refreshToken);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex w-full items-center justify-center bg-black text-white">
      <div className="w-90 flex flex-col items-center p-3 gap-8">
        <Header title="로그인" />
        <GoogleButton />

        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <input
            {...getInputProps("email")}
            className="w-full border border-white h-10 rounded-md p-2"
            type="email"
            placeholder="이메일을 입력해주세요!"
          />
          {errors?.email && touched?.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
          <input
            {...getInputProps("password")}
            className="w-full border border-white h-10 rounded-md p-2 mt-5"
            type="password"
            placeholder="비밀번호를 입력해주세요!"
          />
          {errors?.password && touched?.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
          <button
            className="w-full h-12 rounded-md bg-pink-500 cursor-pointer mt-5 disabled:bg-[#252525ff] disabled:curso"
            type="submit"
            disabled={isDisabled}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
