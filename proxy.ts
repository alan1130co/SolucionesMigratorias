import { getIronSession } from "iron-session";
import { NextResponse, type NextRequest } from "next/server";
import { sessionOptions, type SessionData } from "@/lib/session";

// Rutas bajo /admin y /api/admin que deben quedar accesibles sin sesión:
// la pantalla de login y los endpoints que la sirven (si los protegiéramos,
// nadie podría iniciar sesión nunca).
const PUBLIC_PATHS = new Set(["/admin/login", "/api/admin/login", "/api/admin/logout"]);

export async function proxy(request: NextRequest) {
  if (PUBLIC_PATHS.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  if (!session.isLoggedIn) {
    if (request.nextUrl.pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "No autenticado." }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
