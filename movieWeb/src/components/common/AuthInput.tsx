import React from "react";

interface AuthInputProps {
  type?: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  error?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  type = "text",
  placeholder,
  register,
  error,
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 focus:ring-green-400"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default AuthInput;
