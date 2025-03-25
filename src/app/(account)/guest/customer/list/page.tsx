import React from "react";
import Link from "next/link";

interface Customer {
  user_id: string;
  email: string;
  name: string;
  password: string;
}

export default async function UserPage () {

  const res = await fetch('http://localhost:8000/api/customer/list', {
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch customers: ${res.status}`);
  }

  const data: { customers: Customer[] } = await res.json(); // ✅ 응답 타입 명시
  const customers = data.customers;;

  return (
    <div className="relative min-h-screen bg-gray-100 p-4">
      <div className="absolute top-4 right-4 flex gap-3">
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          홈
        </Link>
        <Link href="/auth/user/login" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
          로그인
        </Link>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h3 className="text-4xl font-bold text-blue-500 mb-6">사용자 목록</h3>

        <div className="w-full max-w-4xl">
          <table className="w-full border-collapse border-4 border-gray-800 border-double shadow-lg bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-800 px-4 py-2 text-left">이름</th>
                <th className="border border-gray-800 px-4 py-2 text-left">이메일</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customers) => (
                <tr key={customers.user_id} className="hover:bg-gray-100">
                  <td className="border border-gray-800 px-4 py-2">{customers.name}</td>
                  <td className="border border-gray-800 px-4 py-2">{customers.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};