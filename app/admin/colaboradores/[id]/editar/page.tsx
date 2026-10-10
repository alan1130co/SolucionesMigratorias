import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getColaboradorById } from "@/lib/colaboradores";
import ColaboradorForm from "../../colaborador-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarColaboradorPage({ params }: Props) {
  const { id } = await params;
  const colaborador = await getColaboradorById(Number(id));

  if (!colaborador) {
    notFound();
  }

  return (
    <div className="max-w-lg space-y-6">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy/50 transition-colors hover:text-navy"
      >
        <ArrowLeft size={16} />
        Volver a colaboradores
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-navy">Editar colaborador</h1>
        <p className="mt-1 text-sm text-navy/50">{colaborador.nombre}</p>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
        <ColaboradorForm mode="editar" colaborador={colaborador} />
      </div>
    </div>
  );
}
