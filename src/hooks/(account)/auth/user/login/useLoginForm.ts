

import { useState } from "react";
import api from '@/lib/axios'
import { useAuthStore } from "@/store/account/auth/user/store";

interface LoginFormState {
  email: string;
  password: string;
}

export default function useLoginForm() {
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });


  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }

    setError("");
    console.log("로그인 요청", form);

    try {
      const response = await api.post('/api/auth/login', {
        email: form.email,
        password: form.password
      });
      
      
      console.log("로그인 성공", response.data);
      const token = response.data.accessToken
      // useAuthStore.getState().setAccessToken(token)
      return true;
    } catch (err: any) {
      setError("로그인 실패. 다시 시도해주세요.");
      console.error("Login error:", err.message);
      return false;
    }
  };

  return { form, error, handleChange, handleSubmit };
}