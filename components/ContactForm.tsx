"use client";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      action="https://formspree.io/f/xoqyrvww"
      method="POST"
      onSubmit={() => setSubmitted(true)}
      className="w-full max-w-xl mx-auto space-y-6"
    >
      <h2 className="text-xl font-bold text-gray-800">聯絡我們</h2>

      {/* 電子信箱 */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">電子信箱</label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-md px-4 py-2 backdrop-blur-sm bg-white/10 border border-black/20 text-slate-800 placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-black/40"
          placeholder="you@example.com"
        />
      </div>

      {/* 留言內容 */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">留言內容</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-md px-4 py-2 backdrop-blur-sm bg-white/10 border border-black/20 text-slate-800 placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-black/40"
          placeholder="請輸入您的訊息"
        />
      </div>

      {/* 送出按鈕 */}
      <button
        type="submit"
        className="inline-block bg-white/20 text-white px-6 py-2 rounded-md hover:bg-white/30 transition"
      >
        送出
      </button>

      {/* 成功訊息 */}
      {submitted && (
        <p className="text-green-400 font-medium">
          已成功送出，我們會儘快聯絡您！
        </p>
      )}
    </form>
  );
}
