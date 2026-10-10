import { v2 as cloudinary } from "cloudinary";

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error(
    "Faltan las variables de entorno CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y/o CLOUDINARY_API_SECRET"
  );
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const MAX_FOTO_BYTES = 4 * 1024 * 1024; // 4MB
const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];

export class FotoInvalidaError extends Error {}

export async function subirFotoColaborador(
  file: File
): Promise<{ url: string; publicId: string }> {
  if (!TIPOS_PERMITIDOS.includes(file.type)) {
    throw new FotoInvalidaError("La foto debe ser JPG, PNG o WEBP.");
  }
  if (file.size > MAX_FOTO_BYTES) {
    throw new FotoInvalidaError("La foto no debe superar 4MB.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "colaboradores",
    resource_type: "image",
  });

  return { url: result.secure_url, publicId: result.public_id };
}

export async function borrarFotoColaborador(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
