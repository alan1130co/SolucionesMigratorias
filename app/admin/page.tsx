import Link from "next/link";
import { Plus } from "lucide-react";
import { listColaboradores } from "@/lib/colaboradores";
import ColaboradorRowActions from "./colaborador-row-actions";

export default async function AdminDashboardPage() {
  const colaboradores = await listColaboradores();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Colaboradores</h1>
          <p className="mt-1 text-sm text-navy/50">
            {colaboradores.length}{" "}
            {colaboradores.length === 1 ? "colaborador registrado" : "colaboradores registrados"}
          </p>
        </div>
        <Link
          href="/admin/colaboradores/nuevo"
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-transform hover:scale-[1.02]"
        >
          <Plus size={16} strokeWidth={2.5} />
          Agregar colaborador
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-navy/10 bg-white shadow-sm">
        <table className="w-full min-w-160 text-left text-sm">
          <thead className="border-b border-navy/10 bg-navy/3 text-xs font-semibold uppercase tracking-wide text-navy/50">
            <tr>
              <th className="px-6 py-4">Foto</th>
              <th className="px-6 py-4">Código</th>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Área</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {colaboradores.map((c) => (
              <tr key={c.id} className="transition-colors hover:bg-navy/2">
                <td className="px-6 py-4">
                  {c.foto_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.foto_url}
                      alt={c.nombre}
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-navy/10"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-navy/10" />
                  )}
                </td>
                <td className="px-6 py-4 font-mono text-navy/80">{c.codigo}</td>
                <td className="px-6 py-4 font-medium text-navy">{c.nombre}</td>
                <td className="px-6 py-4 text-navy/70">{c.area}</td>
                <td className="px-6 py-4">
                  <span
                    className={
                      c.activo
                        ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
                        : "inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                    }
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${c.activo ? "bg-emerald-500" : "bg-red-500"}`}
                    />
                    {c.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <ColaboradorRowActions colaborador={c} />
                </td>
              </tr>
            ))}
            {colaboradores.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-14 text-center text-navy/40">
                  Todavía no hay colaboradores registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
