"use client";

import useSignupForm from "@/hooks/(account)/auth/user/signup/useSignupForm";

interface InputFieldProps {
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
  
function InputField({ type, name, placeholder, value, onChange }: InputFieldProps) {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-blue-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    );
}

export default function SignupForm() {
  const { form, error, handleChange, handleSubmit } = useSignupForm();

  return (
    <form onSubmit={handleSubmit}>
      <InputField 
        type="text" 
        name="user_id" 
        placeholder="아이디" 
        value={form.user_id} 
        onChange={handleChange} 
      />
      <InputField 
        type="email" 
        name="email" 
        placeholder="이메일" 
        value={form.email} 
        onChange={handleChange} 
      />
      <InputField 
        type="text" 
        name="name" 
        placeholder="이름" 
        value={form.name} 
        onChange={handleChange} 
      />
      <InputField 
        type="password" 
        name="password" 
        placeholder="비밀번호" 
        value={form.password} 
        onChange={handleChange} 
      />
      <InputField 
        type="password" 
        name="confirmPassword" 
        placeholder="비밀번호 확인" 
        value={form.confirmPassword} 
        onChange={handleChange} 
      />
      
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
      >
        회원가입
      </button>
    </form>
  );
}