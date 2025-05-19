import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="absolute top-4 right-4 flex gap-3">
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          홈
        </Link>
        <Link href="/auth/user/login" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
          로그인
        </Link>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-4xl font-bold text-blue-500 mb-6">Hello World 2</div>
      </div>
    </div>
  );
}
