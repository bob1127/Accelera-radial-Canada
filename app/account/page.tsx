"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("customerToken");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        載入中...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-4">
      <h1 className="text-2xl font-bold mb-4">會員中心</h1>
      <p className="mb-2">歡迎回來！您已成功登入。</p>

      <button
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => {
          localStorage.removeItem("customerToken");
          router.push("/login");
        }}
      >
        登出
      </button>
    </div>
  );
}
