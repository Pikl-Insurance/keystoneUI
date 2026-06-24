"use client";

import { LoginPage } from "@/components/login-page";
import { useRouter } from "next/navigation";

export default function LoginRoute() {
  const router = useRouter();

  return <LoginPage onLogin={() => router.push("/insights")} />;
}
