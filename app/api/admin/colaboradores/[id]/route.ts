import { NextResponse, type NextRequest } from "next/server";
import { FotoInvalidaError, borrarFotoColaborador, subirFotoColaborador } from "@/lib/cloudinary";
import {
  deleteColaborador,
  getColaboradorById,
  isUniqueViolation,
  normalizeCodigo,
  updateColaborador,
  type ColaboradorUpdateInput,
} from "@/lib/colaboradores";

interface RouteParams {
  params: Promise<{ id: string }>;
}

function parseId(idParam: string): number | null {
  const id = Number(idParam);
  return Number.isInteger(id) ? id : null;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (id === null) {
    return NextResponse.json({ error: "Id inválido." }, { status: 400 });
  }

  const existing = await getColaboradorById(id);
  if (!existing) {
    return NextResponse.json({ error: "Colaborador no encontrado." }, { status: 404 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  const fields: ColaboradorUpdateInput = {};

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();

    const codigoRaw = formData.get("codigo");
    const nombre = formData.get("nombre");
    const area = formData.get("area");
    const foto = formData.get("foto");

    if (typeof codigoRaw === "string" && codigoRaw.trim()) {
      fields.codigo = normalizeCodigo(codigoRaw);
    }
    if (typeof nombre === "string" && nombre.trim()) {
      fields.nombre = nombre.trim();
    }
    if (typeof area === "string" && area.trim()) {
      fields.area = area.trim();
    }
    if (formData.has("activo")) {
      fields.activo = formData.get("activo") === "true";
    }

    if (foto instanceof File && foto.size > 0) {
      try {
        const uploaded = await subirFotoColaborador(foto);
        fields.foto_url = uploaded.url;
        fields.foto_public_id = uploaded.publicId;
      } catch (err) {
        if (err instanceof FotoInvalidaError) {
          return NextResponse.json({ error: err.message }, { status: 400 });
        }
        throw err;
      }
    }
  } else {
    // Toggle rápido de "activo" desde la lista (sin multipart, solo JSON).
    const body = await request.json().catch(() => null);
    if (typeof body?.activo === "boolean") {
      fields.activo = body.activo;
    }
  }

  if (Object.keys(fields).length === 0) {
    return NextResponse.json({ error: "No hay cambios para aplicar." }, { status: 400 });
  }

  try {
    const updated = await updateColaborador(id, fields);

    // Se borra la foto anterior en Cloudinary solo después de que el UPDATE
    // tuvo éxito, para no perder la referencia si algo falla a mitad de camino.
    if (fields.foto_public_id && existing.foto_public_id) {
      await borrarFotoColaborador(existing.foto_public_id).catch(() => {});
    }

    return NextResponse.json({ colaborador: updated });
  } catch (err) {
    if (isUniqueViolation(err)) {
      return NextResponse.json(
        { error: `El código "${fields.codigo}" ya está registrado.` },
        { status: 409 }
      );
    }
    throw err;
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (id === null) {
    return NextResponse.json({ error: "Id inválido." }, { status: 400 });
  }

  const deleted = await deleteColaborador(id);
  if (!deleted) {
    return NextResponse.json({ error: "Colaborador no encontrado." }, { status: 404 });
  }

  if (deleted.foto_public_id) {
    await borrarFotoColaborador(deleted.foto_public_id).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
