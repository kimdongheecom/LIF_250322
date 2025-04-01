import { useState } from "react";

import { useRouter } from "next/navigation";
import { setAccessToken } from '@/lib/authToken'
import { useAuthStore } from "@/store/account/auth/user/store";
import api from "@/lib/axios";


interface LoginFormState {
  email: string;
  password: string;
}

export default function useLoginForm() {
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const router = useRouter();
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
    alert("1.로그인 페이로드(보내는 값):"+ JSON.stringify({
      email: form.email,
      password: form.password
    }));


    try {
      const response = await api.post('http://localhost:8000/api/user/login', {
        email: form.email,
        password: form.password
      });

      alert("2.로그인 성공 데이터(받는 값):"+ JSON.stringify(response.data));
      console.log("로그인 성공", response.data);

      const message = response.data.message;
      const logged_in_user = response.data.logged_in_user;
      const access_token = response.data.access_token;
      setAccessToken(access_token)
      const refresh_token = response.data.refresh_token;

        // ✅ zustand store에서 setUser 가져오기
     

      // ✅ 사용자 정보 상태 저장
      setUser({
        user_id: logged_in_user.user_id,
        email: logged_in_user.email,
        name: logged_in_user.name,
      });

      if (message === "SUCCESS") {
        const token = response.data.accessToken
        // useAuthStore.getState().setAccessToken(token)
        return true;
      } else {
        if (message === "비밀번호가 일치하지 않습니다") {
          alert("비밀번호가 일치하지 않습니다");   
        } else if (message === "고객에서 등록된 ID가 없습니다") {
          alert("고객에서 등록된 ID가 없습니다");
        } else {
          setError(message);
        }
        return false;
      }

    } catch (err: any) {
      setError("로그인 실패. 다시 시도해주세요.");
      console.error("Login error:", err.message);
      return false;
    }
  };

  return { form, error, handleChange, handleSubmit };
}
