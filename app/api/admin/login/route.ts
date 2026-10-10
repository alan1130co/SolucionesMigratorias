import bcrypt from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { getClientIp } from "@/lib/get-client-ip";
import { rateLimitLogin } from "@/lib/rate-limit";
import { getSession } from "@/lib/session";

interface AdminUserRow {
  id: number;
  username: string;
  password_hash: string;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  const { allowed, retryAfterSeconds } = await rateLimitLogin(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Intenta de nuevo más tarde." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds ?? 600) } }
    );
  }

  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json({ error: "Usuario o contraseña incorrectos." }, { status: 400 });
  }

  const rows = (await sql`
    SELECT id, username, password_hash FROM admin_users WHERE username = ${username}
  `) as AdminUserRow[];
  const user = rows[0];

  // Siempre comparamos contra un hash (aunque el usuario no exista) para no filtrar,
  // por tiempo de respuesta, si el username es válido.
  const hashToCompare = user?.password_hash ?? "$2a$10$invalidinvalidinvalidinvalidinvalidinv";
  const passwordMatches = await bcrypt.compare(password, hashToCompare);

  if (!user || !passwordMatches) {
    return NextResponse.json({ error: "Usuario o contraseña incorrectos." }, { status: 401 });
  }

  const session = await getSession();
  session.isLoggedIn = true;
  session.userId = user.id;
  session.username = user.username;
  await session.save();

  return NextResponse.json({ ok: true });
}
