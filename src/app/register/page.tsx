"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
  const [form, setForm] = useState({
    user_id: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 간단한 유효성 검사
    if (!form.user_id || !form.password || !form.confirmPassword || !form.name || !form.email) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
   
    try {
      // API 호출을 통해 회원가입 처리
      const param = {
        user_id: form.user_id,
        password: form.password,
        name: form.name,
        email: form.email,
      }

      // alert 대신 커스텀 알림 사용
      setAlertType("success");
      setAlertMessage("회원가입 요청 중입니다...");
      setShowAlert(true);

      const response = await axios.post("http://localhost:8000/api/customer/create", param);

      console.log("회원가입 성공:", response.data);
      
      // 성공 알림 설정
      setAlertType("success");
      setAlertMessage("회원가입이 성공적으로 완료되었습니다!");
      setShowAlert(true);
      
      // 성공 후 3초 후에 로그인 페이지로 리다이렉트
      setTimeout(() => {
        setShowAlert(false);
        router.push('/login');
      }, 3000);
 
    } catch (err: any) {
      console.error("회원가입 오류:", err);
      setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      
      // 오류 알림 설정
      setAlertType("error");
      setAlertMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
      setShowAlert(true);
      
      // 3초 후 알림 닫기
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="absolute top-4 right-4 flex gap-3">
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          홈
        </Link>
        <Link href="/login" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
          로그인
        </Link>
      </div>
      
      {/* 알림 메시지 */}
      {showAlert && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg ${
          alertType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          {alertMessage}
        </div>
      )}
      
      <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">회원가입</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="이름을 입력하세요"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                <input
                  id="user_id"
                  name="user_id"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="사용할 아이디를 입력하세요"
                  value={form.user_id}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="이메일을 입력하세요"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="비밀번호를 입력하세요"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  회원가입
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">이미 계정이 있으신가요? </span>
              <Link href="/login" className="text-sm text-blue-600 hover:underline">
                로그인
              </Link>
            </div>
          </div>
      
      </div>
    </div>
  );
} 