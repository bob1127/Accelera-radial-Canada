"use client";

import { customerLogin } from "@/lib/shopify/customer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("Logging in...");
    try {
      const res = await customerLogin(email, password);
      if (res.customerAccessToken?.accessToken) {
        localStorage.setItem(
          "customerToken",
          res.customerAccessToken.accessToken
        );
        setMessage("✅ Login successful. Redirecting...");
        router.push("/account");
      } else {
        const errMsg =
          res.userErrors?.[0]?.message ||
          "❌ Login failed. Please check your credentials.";
        setMessage(errMsg);
      }
    } catch (err) {
      setMessage("❌ Login error. Please try again later.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 space-y-4 h-screen flex-col flex justify-center items-center">
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Member Login</h2>
        <input
          type="email"
          className="w-full border p-2 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="w-full bg-black text-white py-2 hover:bg-gray-800 transition"
          onClick={handleLogin}
        >
          Sign In
        </button>
        {message && (
          <p className="text-center text-sm text-gray-700 mt-4">{message}</p>
        )}
      </div>

      <Link href="/register" className="text-gray-600">
        Not a member yet? Register here
      </Link>
    </div>
  );
}
