import { sql } from "@/lib/db";

const MAX_ATTEMPTS = 8;
const WINDOW_MINUTES = 10;

interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

interface RateLimitRow {
  attempts: number;
  window_start: string;
}

/**
 * Cuenta atómica vía UPSERT: si la ventana venció, reinicia a 1; si no, incrementa.
 * Evita condiciones de carrera entre el SELECT y el UPDATE bajo requests concurrentes.
 */
async function checkRateLimit(
  table: "rate_limit_login" | "rate_limit_validar",
  ip: string
): Promise<RateLimitResult> {
  const rows = (
    table === "rate_limit_login"
      ? await sql`
          INSERT INTO rate_limit_login (ip, attempts, window_start)
          VALUES (${ip}, 1, now())
          ON CONFLICT (ip) DO UPDATE SET
            attempts = CASE
              WHEN now() - rate_limit_login.window_start > interval '10 minutes'
              THEN 1 ELSE rate_limit_login.attempts + 1
            END,
            window_start = CASE
              WHEN now() - rate_limit_login.window_start > interval '10 minutes'
              THEN now() ELSE rate_limit_login.window_start
            END
          RETURNING attempts, window_start
        `
      : await sql`
          INSERT INTO rate_limit_validar (ip, attempts, window_start)
          VALUES (${ip}, 1, now())
          ON CONFLICT (ip) DO UPDATE SET
            attempts = CASE
              WHEN now() - rate_limit_validar.window_start > interval '10 minutes'
              THEN 1 ELSE rate_limit_validar.attempts + 1
            END,
            window_start = CASE
              WHEN now() - rate_limit_validar.window_start > interval '10 minutes'
              THEN now() ELSE rate_limit_validar.window_start
            END
          RETURNING attempts, window_start
        `
  ) as RateLimitRow[];

  const row = rows[0];

  if (row.attempts > MAX_ATTEMPTS) {
    const windowStartMs = new Date(row.window_start).getTime();
    const retryAfterSeconds = Math.max(
      0,
      Math.ceil((windowStartMs + WINDOW_MINUTES * 60 * 1000 - Date.now()) / 1000)
    );
    return { allowed: false, retryAfterSeconds };
  }

  return { allowed: true };
}

export const rateLimitLogin = (ip: string) => checkRateLimit("rate_limit_login", ip);
export const rateLimitValidar = (ip: string) => checkRateLimit("rate_limit_validar", ip);
