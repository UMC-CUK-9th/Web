import { useEffect, useState } from "react";
import { FaUserCircle, FaPencilAlt} from "react-icons/fa"; 
import { useAuth } from "../hooks/useAuth";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";
import type { RequestUpdateMyInfoDto } from "../types/auth";
import { useLogoutMutation } from "../hooks/mutations/useLogoutMutation";


const profileSchema = z.object({
  name: z.string().min(1, { message: "닉네임을 1자 이상 입력해주세요." }),
  bio: z.string().nullable().optional(), 
  avatar: z.string().url({ message: "유효한 URL을 입력해주세요." }).nullable().optional().or(z.literal("")),
});

type ProfileFormFields = z.infer<typeof profileSchema>;

const MyPage = () => {
 const { user } = useAuth();

const [isEditing, setIsEditing] = useState(false);
 
const {
    register,
    handleSubmit,
    reset, 
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormFields>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

const { mutate: updateProfile } = useUpdateMyInfo();
const { mutate: logoutMutate, isPending: isLoggingOut } = useLogoutMutation();

useEffect(() => {
    if (isEditing && user) {
      reset({
        name: user.name,
        bio: user.bio,
        avatar: user.avatar,
      });
    }
  }, [isEditing, user, reset]);

const handleLogout = () => {
logoutMutate();
 };

const onProfileSubmit: SubmitHandler<ProfileFormFields> = (data) => {
    const payload: RequestUpdateMyInfoDto = {
        name: data.name,
        bio: data.bio || null, 
        avatar: data.avatar || null,
    };
    
    updateProfile(payload, {
        onSuccess: () => {
            setIsEditing(false); 
        }
    });
 };


if (!user) {
 return (
 <div className="flex items-center justify-center h-[calc(100vh-140px)]">
 <p className="text-xl text-slate-600">로딩 중...</p>
 </div>
 );
 }

 if (isEditing) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-12 px-4">
        <form 
          onSubmit={handleSubmit(onProfileSubmit)}
          className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 w-full max-w-md relative"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            프로필 수정
          </h2>


          <label className="block text-sm font-medium text-slate-600 mb-1">이미지 URL</label>
          <input
            {...register("avatar")}
            className={`w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
                errors?.avatar ? "border-red-500 bg-red-50" : "border-slate-300"
            }`}
            type="text"
          />
          {errors.avatar && <div className="text-red-500 text-sm mt-1">{errors.avatar.message}</div>}


          <label className="block text-sm font-medium text-slate-600 mt-4 mb-1">닉네임</label>
          <input
            {...register("name")}
            className={`w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
                errors?.name ? "border-red-500 bg-red-50" : "border-slate-300"
            }`}
            type="text"
            placeholder="닉네임"
          />
          {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>}


          <label className="block text-sm font-medium text-slate-600 mt-4 mb-1">소개</label>
          <textarea
            {...register("bio")}
            className={`w-full py-3 px-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition border ${
                errors?.bio ? "border-red-500 bg-red-50" : "border-slate-300"
            }`}
            rows={3}
          />
          {errors.bio && <div className="text-red-500 text-sm mt-1">{errors.bio.message}</div>}


          <div className="flex gap-3 mt-8 w-full">
            <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 rounded-lg text-lg font-semibold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
            >
                취소
            </button>
            <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-lg text-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:bg-slate-300"
            >
                {isSubmitting ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    );
 }


 return (
 <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] text-center px-4">

    <div className="absolute top-6 right-6 flex gap-3">
        <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
        >
            <FaPencilAlt /> 프로필 수정
        </button>
    </div>


    {user.avatar ? (
        <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-indigo-100" />
    ) : (
        <FaUserCircle className="text-indigo-200 text-8xl mb-4" />
    )}
    

    <h1 className="text-4xl font-bold text-slate-800">
        {user.name}
    </h1>
    

    <h2 className="text-xl text-slate-600 mt-2">{user.email}</h2>


    {user.bio && (
        <p className="mt-4 max-w-md text-slate-500 italic">
            "{user.bio}"
        </p>
    )}

<button
 className="mt-8 px-6 py-3 text-lg font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-transform hover:scale-105"
 onClick={handleLogout}
 disabled={isLoggingOut}
 >
 로그아웃
 </button>
 </div>
 );
};

export default MyPage; 