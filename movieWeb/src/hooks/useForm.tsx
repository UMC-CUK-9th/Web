import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

type FormErrors = Partial<FormValues>;

export const useForm = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = (name: string, value: string) => {
    let error = "";

    if (name === "email") {
      if (!value) error = "이메일을 입력해주세요.";
      else if (!validateEmail(value)) error = "유효하지 않은 이메일 형식입니다.";
    }

    if (name === "password") {
      if (!value) error = "비밀번호를 입력해주세요.";
      else if (value.length < 6) error = "비밀번호는 최소 6자 이상이어야 합니다.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const isValid =
    Object.values(errors).every((err) => !err) &&
    values.email !== "" &&
    values.password !== "";

  return { values, errors, handleChange, isValid };
};
