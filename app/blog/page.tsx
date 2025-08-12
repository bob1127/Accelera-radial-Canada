// app/blog/page.tsx
import { redirect } from "next/navigation";

export default function BlogIndex() {
  redirect("/blog/news"); // 你的預設 blog handle
}
