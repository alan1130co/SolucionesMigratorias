import { sql } from "@/lib/db";

export interface Colaborador {
  id: number;
  codigo: string;
  nombre: string;
  area: string;
  foto_url: string | null;
  foto_public_id: string | null;
  activo: boolean;
  created_at: string;
}

export interface ColaboradorPublico {
  nombre: string;
  area: string;
  foto_url: string | null;
  activo: boolean;
}

export interface ColaboradorCreateInput {
  codigo: string;
  nombre: string;
  area: string;
  fotoUrl: string | null;
  fotoPublicId: string | null;
}

export interface ColaboradorUpdateInput {
  codigo?: string;
  nombre?: string;
  area?: string;
  foto_url?: string | null;
  foto_public_id?: string | null;
  activo?: boolean;
}

/** Quita espacios y normaliza a mayúsculas: "SM AC 03" -> "SMAC03". */
export function normalizeCodigo(codigo: string): string {
  return codigo.replace(/\s+/g, "").toUpperCase();
}

export function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "23505"
  );
}

export async function listColaboradores(): Promise<Colaborador[]> {
  return (await sql`
    SELECT id, codigo, nombre, area, foto_url, foto_public_id, activo, created_at
    FROM colaboradores
    ORDER BY created_at DESC
  `) as Colaborador[];
}

export async function getColaboradorById(id: number): Promise<Colaborador | null> {
  const rows = (await sql`
    SELECT id, codigo, nombre, area, foto_url, foto_public_id, activo, created_at
    FROM colaboradores WHERE id = ${id}
  `) as Colaborador[];
  return rows[0] ?? null;
}

/** Usada por la búsqueda pública: solo trae lo necesario para la tarjeta de verificación. */
export async function findByCodigo(codigoNormalizado: string): Promise<ColaboradorPublico | null> {
  const rows = (await sql`
    SELECT nombre, area, foto_url, activo
    FROM colaboradores WHERE codigo = ${codigoNormalizado}
  `) as ColaboradorPublico[];
  return rows[0] ?? null;
}

export async function createColaborador(data: ColaboradorCreateInput): Promise<Colaborador> {
  const rows = (await sql`
    INSERT INTO colaboradores (codigo, nombre, area, foto_url, foto_public_id)
    VALUES (${data.codigo}, ${data.nombre}, ${data.area}, ${data.fotoUrl}, ${data.fotoPublicId})
    RETURNING id, codigo, nombre, area, foto_url, foto_public_id, activo, created_at
  `) as Colaborador[];
  return rows[0];
}

export async function updateColaborador(
  id: number,
  fields: ColaboradorUpdateInput
): Promise<Colaborador | null> {
  const keys = Object.keys(fields) as (keyof ColaboradorUpdateInput)[];
  if (keys.length === 0) {
    return getColaboradorById(id);
  }

  const setClauses = keys.map((key, i) => `${key} = $${i + 1}`);
  const values = keys.map((key) => fields[key]);

  const rows = (await sql.query(
    `UPDATE colaboradores SET ${setClauses.join(", ")} WHERE id = $${keys.length + 1}
     RETURNING id, codigo, nombre, area, foto_url, foto_public_id, activo, created_at`,
    [...values, id]
  )) as Colaborador[];

  return rows[0] ?? null;
}

export async function deleteColaborador(id: number): Promise<Colaborador | null> {
  const rows = (await sql`
    DELETE FROM colaboradores WHERE id = ${id}
    RETURNING id, codigo, nombre, area, foto_url, foto_public_id, activo, created_at
  `) as Colaborador[];
  return rows[0] ?? null;
}
