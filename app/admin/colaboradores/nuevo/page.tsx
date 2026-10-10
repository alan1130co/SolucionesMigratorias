import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ColaboradorForm from "../colaborador-form";

export default function NuevoColaboradorPage() {
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
        <h1 className="text-2xl font-bold text-navy">Agregar colaborador</h1>
        <p className="mt-1 text-sm text-navy/50">
          Completa los datos para generar el carné de verificación.
        </p>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
        <ColaboradorForm mode="crear" />
      </div>
    </div>
  );
}
