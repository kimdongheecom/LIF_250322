import Link from "next/link";

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="w-full max-w-4xl flex justify-between items-center mx-auto">
        {/* 홈 버튼 (왼쪽) */}
        <Link href="/" className="text-lg font-semibold hover:underline">
          홈
        </Link>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
    </nav>
  );
}