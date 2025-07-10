"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("註冊中...");
    try {
      const res = await fetch("/api/admin-create-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName: "顧客", // ✅ 可改為表單輸入
          lastName: "先生/小姐", // ✅ 可改為表單輸入
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("✅ 註冊成功，請前往登入");
      } else {
        const errorMsg =
          data?.error?.[0]?.message || "❌ 註冊失敗，請確認輸入資料";
        setMessage(errorMsg);
      }
    } catch (err) {
      console.error("❌ 註冊錯誤", err);
      setMessage("❌ 註冊錯誤，請稍後再試");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 space-y-4 h-screen flex justify-center items-center">
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4 text-center">註冊帳號</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full p-2 border mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          className="w-full p-2 border mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-2 hover:bg-gray-800 transition"
        >
          註冊
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}
