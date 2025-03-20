"use client";

import { useState } from "react";
import axios from "axios";

export default function Signup() {

    const [form, setForm] = useState({
    user_id: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
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


    console.log("Form submitted", form);

    try {
      const response = await axios.post("http://localhost:8000/api/customer/create", {
        user_id: form.user_id,
        email: form.email,
        password: form.password,
        name: form.name,
      });

      // 성공 메시지 설정
      console.log("Signup success:", response.data);
    } catch (err: any) {
      setError("Signup failed. Please try again.");
      console.error("Signup error:", err.response?.data || err.message);
    }
  };



  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Guest Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_id"
            placeholder="User ID"
            value={form.user_id}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            required
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Log in</a>
        </p>
      </div>
    </div>
  );
}