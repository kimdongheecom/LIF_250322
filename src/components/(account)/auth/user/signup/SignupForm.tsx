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
        className="w-full p-2 border rounded mb-2"
        required
      />
    );
  }
  

export default function SignupForm() {
  const { form, error, handleChange, handleSubmit } = useSignupForm();

  return (
    <form onSubmit={handleSubmit}>
      <InputField type="text" name="user_id" placeholder="User ID" value={form.user_id} onChange={handleChange} />
      <InputField type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <InputField type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <InputField type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <InputField type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
      
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Sign Up
      </button>
    </form>
  );
}