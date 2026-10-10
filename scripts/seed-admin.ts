/**
 * Crea (o actualiza la contraseña de) el único usuario del panel /admin.
 *
 * Uso:
 *   SEED_ADMIN_USERNAME=marketing SEED_ADMIN_PASSWORD='clave-fuerte' npx tsx scripts/seed-admin.ts
 *
 * No se corre automáticamente en el deploy: es manual, una sola vez
 * (o cada vez que quieras rotar la contraseña).
 */
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME?.trim();
  const password = process.env.SEED_ADMIN_PASSWORD;
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("Falta DATABASE_URL en el entorno.");
  }
  if (!username || !password) {
    throw new Error(
      "Faltan SEED_ADMIN_USERNAME y/o SEED_ADMIN_PASSWORD en el entorno."
    );
  }
  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  }

  const sql = neon(databaseUrl);
  const passwordHash = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO admin_users (username, password_hash)
    VALUES (${username}, ${passwordHash})
    ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash
  `;

  console.log(`Usuario admin "${username}" creado/actualizado correctamente.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
