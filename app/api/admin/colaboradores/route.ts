import { NextResponse, type NextRequest } from "next/server";
import { FotoInvalidaError, subirFotoColaborador } from "@/lib/cloudinary";
import {
  createColaborador,
  isUniqueViolation,
  listColaboradores,
  normalizeCodigo,
} from "@/lib/colaboradores";

export async function GET() {
  const colaboradores = await listColaboradores();
  return NextResponse.json({ colaboradores });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const codigoRaw = formData.get("codigo");
  const nombre = formData.get("nombre");
  const area = formData.get("area");
  const foto = formData.get("foto");

  if (
    typeof codigoRaw !== "string" ||
    typeof nombre !== "string" ||
    typeof area !== "string" ||
    !codigoRaw.trim() ||
    !nombre.trim() ||
    !area.trim()
  ) {
    return NextResponse.json(
      { error: "Código, nombre y área son obligatorios." },
      { status: 400 }
    );
  }

  const codigo = normalizeCodigo(codigoRaw);

  let fotoUrl: string | null = null;
  let fotoPublicId: string | null = null;

  if (foto instanceof File && foto.size > 0) {
    try {
      const uploaded = await subirFotoColaborador(foto);
      fotoUrl = uploaded.url;
      fotoPublicId = uploaded.publicId;
    } catch (err) {
      if (err instanceof FotoInvalidaError) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      throw err;
    }
  }

  try {
    const colaborador = await createColaborador({
      codigo,
      nombre: nombre.trim(),
      area: area.trim(),
      fotoUrl,
      fotoPublicId,
    });
    return NextResponse.json({ colaborador }, { status: 201 });
  } catch (err) {
    if (isUniqueViolation(err)) {
      return NextResponse.json(
        { error: `El código "${codigo}" ya está registrado.` },
        { status: 409 }
      );
    }
    throw err;
  }
}
