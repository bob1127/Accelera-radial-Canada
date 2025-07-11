"use client";

import { customerRecover } from "@/lib/shopify/customer"; // 等下我會附上函式
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRecover = async () => {
    setMessage("處理中...");
    try {
      const res = await customerRecover(email);
      if (res?.customerRecover?.userErrors?.length) {
        setMessage(`❌ ${res.customerRecover.userErrors[0].message}`);
      } else {
        setMessage("✅ 密碼重設信已寄出，請檢查您的 Email 信箱");
      }
    } catch (err) {
      setMessage("❌ 發送失敗，請稍後再試");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4 text-center">
      <h2 className="text-xl font-bold mb-2">忘記密碼</h2>
      <p className="text-sm text-gray-600">
        請輸入註冊時的 Email，我們會寄送密碼重設連結
      </p>
      <input
        type="email"
        className="w-full border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button
        onClick={handleRecover}
        className="w-full bg-black text-white py-2 hover:bg-gray-800"
      >
        發送重設信
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
