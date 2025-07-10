// /app/login/page.tsx
"use client";

import { customerLogin } from "@/lib/shopify/customer";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await customerLogin(email, password);
      if (res.customerAccessToken?.accessToken) {
        localStorage.setItem(
          "shopifyToken",
          res.customerAccessToken.accessToken
        );
        alert("登入成功");
      } else {
        setError(res.userErrors?.[0]?.message || "登入失敗");
      }
    } catch (err) {
      setError("登入錯誤");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 space-y-4  h-screen flex justify-center items-center">
      <div>
        <input
          type="email"
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密碼"
        />
        <button
          className="w-full bg-black text-white py-2"
          onClick={handleLogin}
        >
          登入
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
