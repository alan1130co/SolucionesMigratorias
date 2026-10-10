"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Colaborador } from "@/lib/colaboradores";

interface Props {
  mode: "crear" | "editar";
  colaborador?: Colaborador;
}

export default function ColaboradorForm({ mode, colaborador }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(
        mode === "crear" ? "/api/admin/colaboradores" : `/api/admin/colaboradores/${colaborador!.id}`,
        {
          method: mode === "crear" ? "POST" : "PATCH",
          body: formData,
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "No se pudo guardar.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="codigo" className="mb-1.5 block text-sm font-medium text-navy/70">
          Código (como está impreso en el carné)
        </label>
        <input
          id="codigo"
          name="codigo"
          defaultValue={colaborador?.codigo}
          required
          placeholder="SM AC 03"
          className="w-full rounded-lg border border-navy/15 px-3.5 py-2.5 text-navy outline-none transition-colors focus:border-gold"
        />
        <p className="mt-1.5 text-xs text-navy/40">
          Se guarda sin espacios y en mayúsculas automáticamente.
        </p>
      </div>

      <div>
        <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-navy/70">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          defaultValue={colaborador?.nombre}
          required
          className="w-full rounded-lg border border-navy/15 px-3.5 py-2.5 text-navy outline-none transition-colors focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="area" className="mb-1.5 block text-sm font-medium text-navy/70">
          Área
        </label>
        <input
          id="area"
          name="area"
          defaultValue={colaborador?.area}
          required
          className="w-full rounded-lg border border-navy/15 px-3.5 py-2.5 text-navy outline-none transition-colors focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="foto" className="mb-1.5 block text-sm font-medium text-navy/70">
          Foto {mode === "editar" && <span className="font-normal text-navy/40">(deja vacío para no cambiarla)</span>}
        </label>
        {colaborador?.foto_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={colaborador.foto_url}
            alt={colaborador.nombre}
            className="mb-3 h-16 w-16 rounded-full object-cover ring-1 ring-navy/10"
          />
        )}
        <input
          id="foto"
          name="foto"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="w-full rounded-lg border border-navy/15 px-3.5 py-2.5 text-sm text-navy/70 file:mr-3 file:rounded-full file:border-0 file:bg-navy/5 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-navy"
        />
      </div>

      {mode === "editar" && (
        <label className="flex items-center gap-2 text-sm font-medium text-navy/70">
          <input
            type="checkbox"
            name="activo"
            value="true"
            defaultChecked={colaborador?.activo}
            className="h-4 w-4 rounded border-navy/30 text-gold focus:ring-gold"
          />
          <input type="hidden" name="activo" value="false" />
          Activo
        </label>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-full border border-navy/15 px-6 py-2.5 text-sm font-medium text-navy/70 transition-transform hover:scale-[1.02]"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
