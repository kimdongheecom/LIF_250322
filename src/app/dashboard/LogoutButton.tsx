"use client";

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // 로컬 스토리지에서 인증 토큰 제거
    localStorage.removeItem('auth-storage');
    
    // 홈페이지로 리다이렉트
    router.push('/');
  };

  return (
    <button
      className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  );
} 