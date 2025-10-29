import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_API_URL + "/v1/auth/google/login";
  };

  return (
    <>
      <button
        className="relative w-full h-10 border border-white rounded-lg cursor-pointer"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="absolute left-3 top-2 size-6" />
        구글 로그인
      </button>
      <div className="flex items-center gap-8">
        <hr className="w-30" />
        <p>OR</p>
        <hr className="w-30" />
      </div>
    </>
  );
};

export default GoogleButton;
