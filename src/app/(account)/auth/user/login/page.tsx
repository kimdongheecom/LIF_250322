"use client";

import LoginForm from "@/components/(account)/auth/user/login/LoginForm";


export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">로그인</h2>
        <LoginForm />
        <p className="text-center text-sm text-gray-600 mt-4">
          계정이 없으신가요?{" "}
          <a href="/auth/user/login" className="text-blue-500 no-underline hover:underline">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}