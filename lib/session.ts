import type { SessionOptions } from "iron-session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  isLoggedIn: boolean;
  userId?: number;
  username?: string;
}

const defaultSession: SessionData = { isLoggedIn: false };

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
  throw new Error(
    "Falta SESSION_SECRET o es muy corta (debe tener al menos 32 caracteres)"
  );
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: "sm_admin_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  },
};

/** Para usar en Route Handlers y Server Components (app/admin/**). */
export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (session.isLoggedIn === undefined) {
    Object.assign(session, defaultSession);
  }
  return session;
}
