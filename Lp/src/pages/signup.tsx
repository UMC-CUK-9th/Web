import z from "zod";
import Header from "../components/header";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postSignup } from "../apis/auth";
import { MdEmail } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import GoogleButton from "../components/googleButton";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(6, {
        message: "비밀번호는 6자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
      }),
    passwordCheck: z.string(),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다. ",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const passwordType = showPassword ? "text" : "password";

  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const passwordCheckType = showPasswordCheck ? "text" : "password";

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, touchedFields },
    trigger,
    watch,
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

  const watchedEmail = watch("email");
  const watchedName = watch("name");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;

    const isValid = await trigger();
    if (!isValid) return;

    try {
      await postSignup(rest);
      navigate("/login");
    } catch (e) {
      console.log("회원가입실패" + e);
    }
  };

  const [step, setStep] = useState(1);

  const emailIsDisabled = !watchedEmail || !!errors.email;

  const passwordIsDisabled =
    !getValues("password") ||
    !getValues("passwordCheck") ||
    !!errors.password ||
    !!errors.passwordCheck;

  const nameIsDisabled = !watchedName || !!errors.name;

  return (
    <div className="flex w-full items-center justify-center bg-black text-white">
      <div className="w-90 flex flex-col items-center p-3 gap-8">
        <Header title="회원가입" />
        <form
          className="flex flex-col items-center p-3 gap-8 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {step == 1 && (
            <>
              <GoogleButton />
              <div className="flex flex-col w-full">
                <input
                  {...register("email")}
                  className="w-full border border-white h-10 rounded-md p-2"
                  type="email"
                  placeholder="이메일을 입력해주세요!"
                />
                {!!errors.email && !!touchedFields?.email && (
                  <div className="text-red-500">{errors.email?.message}</div>
                )}
              </div>
              <button
                className="w-full h-12 rounded-md bg-pink-500 cursor-pointer disabled:bg-[#252525ff] disabled:cursor-default"
                onClick={() => setStep(2)}
                type="button"
                disabled={emailIsDisabled}
              >
                다음
              </button>
            </>
          )}

          {step == 2 && (
            <div className="flex flex-col w-full gap-3">
              <p className="flex items-center gap-2">
                <MdEmail className="size-5" />
                {getValues("email")}
              </p>
              <div className="relative">
                <input
                  {...register("password")}
                  className="w-full border border-white h-10 rounded-md p-2"
                  type={passwordType}
                  placeholder="비밀번호를 입력해주세요!"
                />
                <button
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                  type="button"
                >
                  {showPassword ? <LuEye /> : <LuEyeClosed />}
                </button>
                {!!errors.password && !!touchedFields?.password && (
                  <div className="text-red-500">{errors.password?.message}</div>
                )}
              </div>
              <div className="relative">
                <input
                  {...register("passwordCheck")}
                  className="w-full border border-white h-10 rounded-md p-2"
                  type={passwordCheckType}
                  placeholder="비밀번호를 다시 한 번 입력해주세요!"
                />
                <button
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPasswordCheck((prev) => !prev);
                  }}
                  type="button"
                >
                  {showPasswordCheck ? <LuEye /> : <LuEyeClosed />}
                </button>
                {!!errors.passwordCheck && !!touchedFields?.passwordCheck && (
                  <div className="text-red-500">
                    {errors.passwordCheck?.message}
                  </div>
                )}
              </div>
              <button
                className="w-full h-12 rounded-md bg-pink-500 cursor-pointer disabled:bg-[#252525ff] disabled:cursor-default"
                onClick={() => setStep(3)}
                disabled={passwordIsDisabled}
                type="button"
              >
                다음
              </button>
            </div>
          )}

          {step == 3 && (
            <div className="w-full flex flex-col items-center gap-5">
              <div className="size-50 bg-white rounded-full"> </div>
              <input
                {...register("name")}
                className="w-full border border-white h-10 rounded-md p-2"
                type="text"
                placeholder="이름을 입력해주세요!"
              />
              {!!errors.name && !!touchedFields?.name && (
                <div className="text-red-500">{errors.name?.message}</div>
              )}

              <button
                className="w-full h-12 rounded-md bg-pink-500 cursor-pointer disabled:bg-[#252525ff] disabled:cursor-default"
                type="submit"
                disabled={nameIsDisabled || isSubmitting}
              >
                회원가입 완료
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
