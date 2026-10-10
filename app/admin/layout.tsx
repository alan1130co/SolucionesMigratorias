import type { ReactNode } from "react";
import { getSession } from "@/lib/session";
import AdminTopBar from "./admin-top-bar";

/**
 * Layout propio del panel /admin — separado por completo del sitio público
 * (sin Header/Footer de marketing, ver app/components/SiteChrome.tsx).
 * En /admin/login todavía no hay sesión, así que esa página se renderiza
 * sin la barra superior del panel.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F4F5F9]">
      <AdminTopBar username={session.username ?? ""} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">{children}</main>
    </div>
  );
}
