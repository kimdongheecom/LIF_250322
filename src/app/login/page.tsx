"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 간단한 유효성 검사
    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 실제로는 여기서 API 호출을 통해 로그인 처리를 해야 합니다.
      // 예시 코드이므로 아이디가 'aaa'이고 비밀번호가 'bbb'일 때만 성공하도록 함
      if (username === "aaa" && password === "bbb") {
        setIsSuccess(true);
        setError("");
        // 성공 후 3초 후에 메인 페이지로 리다이렉트
        setTimeout(() => {
          router.push('/dashboard/common/user/templates');
        }, 3000);
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        setIsSuccess(false);
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsSuccess(false);
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
      
      <div className="flex flex-col items-center justify-center min-h-screen">
        {isSuccess ? (
          // 로그인 성공 화면
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">로그인 성공!</h2>
              <p className="text-gray-600 mb-4">환영합니다. 잠시 후 대시보드로 이동합니다.</p>
              <div className="mt-6">
                <Link href="/dashboard/common/user/templates" className="text-blue-600 hover:underline">
                  지금 바로 대시보드로 이동
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // 로그인 폼
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">로그인</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                <input
                  id="username"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="아이디를 입력하세요"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  로그인
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">계정이 없으신가요? </span>
              <Link href="/register" className="text-sm text-blue-600 hover:underline">
                회원가입
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 