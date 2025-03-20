// app/signup/hooks/useSignupForm.ts
import { useState } from "react";
import axios from "axios";

export function useSignupForm() {
  const [form, setForm] = useState({
    user_id: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.user_id.length < 3 || form.user_id.length > 10) {
      setError("User ID must be between 3 and 10 characters");
      return;
    }
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/customer/create", {
        user_id: form.user_id,
        email: form.email,
        password: form.password,
        name: form.name,
      });

      console.log("Signup success:", response.data);
    } catch (err: any) {
      setError("Signup failed. Please try again.");
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  return { form, error, handleChange, handleSubmit };
}
