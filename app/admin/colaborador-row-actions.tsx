"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Colaborador } from "@/lib/colaboradores";

export default function ColaboradorRowActions({ colaborador }: { colaborador: Colaborador }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleActivo() {
    setLoading(true);
    try {
      await fetch(`/api/admin/colaboradores/${colaborador.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: !colaborador.activo }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function eliminar() {
    if (!confirm(`¿Eliminar a ${colaborador.nombre}? Esta acción no se puede deshacer.`)) {
      return;
    }
    setLoading(true);
    try {
      await fetch(`/api/admin/colaboradores/${colaborador.id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/admin/colaboradores/${colaborador.id}/editar`}
        className="rounded-full border border-navy/15 px-3 py-1.5 text-xs font-medium text-navy transition-transform hover:scale-[1.02] hover:border-navy/30"
      >
        Editar
      </Link>
      <button
        onClick={toggleActivo}
        disabled={loading}
        className="rounded-full border border-navy/15 px-3 py-1.5 text-xs font-medium text-navy transition-transform hover:scale-[1.02] hover:border-navy/30 disabled:opacity-50"
      >
        {colaborador.activo ? "Desactivar" : "Activar"}
      </button>
      <button
        onClick={eliminar}
        disabled={loading}
        className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-transform hover:scale-[1.02] hover:border-red-300 disabled:opacity-50"
      >
        Eliminar
      </button>
    </div>
  );
}
