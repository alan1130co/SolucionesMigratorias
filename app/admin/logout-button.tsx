"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-navy/15 px-4 py-2 text-sm font-medium text-navy transition-transform hover:scale-[1.02] hover:border-navy/30"
    >
      Cerrar sesión
    </button>
  );
}
