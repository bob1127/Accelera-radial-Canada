"use client";

import { getCustomerInfo } from "@/lib/shopify/customer"; // 根據實際路徑調整
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarClient() {
  const [name, setName] = useState<string | null>(null);
  const [checked, setChecked] = useState(false); // 判斷是否已完成檢查

  useEffect(() => {
    const token = localStorage.getItem("customerToken");

    if (token) {
      getCustomerInfo(token)
        .then((customer) => {
          if (customer && (customer.firstName || customer.lastName)) {
            setName(
              [customer.firstName, customer.lastName].filter(Boolean).join(" ")
            );
          }
        })
        .catch((err) => {
          console.error("⚠️ 無法取得客戶資訊：", err);
          setName(null);
        })
        .finally(() => setChecked(true));
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) return null;

  return name ? (
    <div className="flex items-center mr-4">
      <Link
        href="/account"
        className="text-sm text-white underline hover:no-underline"
      >
        Hello, {name}
      </Link>
    </div>
  ) : (
    <Link
      href="/login"
      className="flex items-center mr-4 hover:opacity-80"
      title="登入 / 註冊"
    >
      <UserIcon className="w-6 h-6 text-white" />
    </Link>
  );
}
