"use client";
import SignupForm from "@/components/(account)/auth/user/signup/SignupForm";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">회원가입</h2>
        <SignupForm />
        <p className="text-center text-sm text-gray-600 mt-4">
          이미 계정이 있으신가요?{" "}
          <Link href="/auth/user/login" className="text-blue-500 no-underline hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}