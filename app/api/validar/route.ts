import { NextResponse, type NextRequest } from "next/server";
import { findByCodigo, normalizeCodigo } from "@/lib/colaboradores";
import { getClientIp } from "@/lib/get-client-ip";
import { rateLimitValidar } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  const { allowed, retryAfterSeconds } = await rateLimitValidar(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Intenta de nuevo más tarde." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds ?? 600) } }
    );
  }

  const body = await request.json().catch(() => null);
  const codigoRaw = typeof body?.codigo === "string" ? body.codigo : "";

  if (!codigoRaw.trim()) {
    return NextResponse.json({ encontrado: false });
  }

  const codigo = normalizeCodigo(codigoRaw);
  const colaborador = await findByCodigo(codigo);

  if (!colaborador || !colaborador.activo) {
    return NextResponse.json({ encontrado: false });
  }

  return NextResponse.json({
    encontrado: true,
    nombre: colaborador.nombre,
    area: colaborador.area,
    fotoUrl: colaborador.foto_url,
  });
}
