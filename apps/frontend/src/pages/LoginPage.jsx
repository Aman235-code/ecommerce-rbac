import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("user123");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      login({ email, password });
      nav("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
      <div className="mt-3 text-sm text-gray-500">
        Try admin@example.com / admin123 (admin) or user@example.com / user123
        (user)
      </div>
    </div>
  );
}
