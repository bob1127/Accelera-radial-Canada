"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Customer {
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("customerToken");

    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
      fetchCustomerInfo(storedToken);
    }
  }, [router]);

  const fetchCustomerInfo = async (accessToken: string) => {
    try {
      const res = await fetch(
        "https://wdgc3h-wc.myshopify.com/api/2024-04/graphql.json",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              "ffe48fa71b4ab65c45768c16ae3108bc",
          },
          body: JSON.stringify({
            query: `
            query {
              customer(customerAccessToken: "${accessToken}") {
                firstName
                lastName
                email
              }
            }
          `,
          }),
        }
      );

      const json = await res.json();
      const customerData = json.data?.customer;

      if (customerData) {
        setCustomer(customerData);
      } else {
        localStorage.removeItem("customerToken");
        router.push("/login");
      }
    } catch (error) {
      console.error("取得會員資料失敗", error);
      localStorage.removeItem("customerToken");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        載入中...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-[200px] mt-12 p-4">
      <h1 className="text-2xl font-bold mb-4">ACCOUNT</h1>
      {customer ? (
        <>
          <p className="mb-2">
            您好，{customer.firstName || ""} {customer.lastName || ""}
          </p>
          <p className="mb-4">Email：{customer.email}</p>
        </>
      ) : (
        <p className="text-red-500">無法取得會員資料</p>
      )}
      <button
        className="mt-6 rounded-[30px] px-8 py-2 bg-red-500 text-white hover:bg-red-600"
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
