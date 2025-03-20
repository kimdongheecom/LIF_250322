import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function DashboardPage() {
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
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">사용자 대시보드</h2>
          
          <div className="mt-8 text-center">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
} 