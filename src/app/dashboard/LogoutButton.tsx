"use client";

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // 실제 구현에서는 여기서 로그아웃 API를 호출하고
    // 로컬 스토리지나 쿠키에서 인증 토큰을 제거해야 합니다.
    
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