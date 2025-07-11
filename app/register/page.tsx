"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      setMessage("❌ All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("❌ Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setMessage("Registering, please wait...");

    try {
      const res = await fetch("/api/storefront-create-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("customerToken", data.accessToken);
        setMessage(
          "✅ Registration successful. Redirecting to your account shortly. You may ignore the activation email."
        );
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const rawMessage =
          typeof data?.error === "string"
            ? data.error
            : data?.error?.[0]?.message || "❌ Registration failed.";

        const friendlyMessage = rawMessage.includes("taken")
          ? "❌ This email is already registered. Please use another one."
          : rawMessage;

        setMessage(friendlyMessage);
      }
    } catch (err) {
      console.error("❌ Registration error", err);
      setMessage("❌ Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 space-y-4 h-screen flex justify-center items-center">
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4 text-center">
          Create an Account
        </h2>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          className="w-full p-2 border mb-2"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          className="w-full p-2 border mb-2"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full p-2 border mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min. 6 characters)"
          value={password}
          className="w-full p-2 border mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-black text-white py-2 hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}
