import type { NextRequest } from "next/server";

/** Vercel pasa la IP real del cliente en x-forwarded-for (primer valor de la lista). */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
