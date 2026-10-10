"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, XCircle } from "lucide-react";

interface ColaboradorEncontrado {
  codigo: string;
  nombre: string;
  area: string;
  fotoUrl: string | null;
}

type Result =
  | { status: "success"; data: ColaboradorEncontrado }
  | { status: "error"; query: string }
  | { status: "rate_limited"; message: string }
  | null;

async function buscarColaborador(codigoRaw: string): Promise<Result> {
  const codigoNormalizado = codigoRaw.trim().replace(/\s+/g, "").toUpperCase();
  try {
    const res = await fetch("/api/validar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo: codigoRaw }),
    });

    if (res.status === 429) {
      const data = await res.json().catch(() => ({}));
      return {
        status: "rate_limited",
        message: data.error ?? "Demasiados intentos. Intenta de nuevo más tarde.",
      };
    }

    if (!res.ok) {
      return { status: "error", query: codigoRaw };
    }

    const data = await res.json();
    if (data.encontrado) {
      return {
        status: "success",
        data: {
          codigo: codigoNormalizado,
          nombre: data.nombre,
          area: data.area,
          fotoUrl: data.fotoUrl ?? null,
        },
      };
    }
    return { status: "error", query: codigoRaw };
  } catch {
    return { status: "error", query: codigoRaw };
  }
}

export default function ValidarClient() {
  const searchParams = useSearchParams();
  const codigoInicial = searchParams.get("codigo") ?? "";

  const [value, setValue] = useState(codigoInicial);
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (codigoInicial.trim()) {
      setLoading(true);
      buscarColaborador(codigoInicial).then((r) => {
        setResult(r);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const query = value.trim();
    if (!query) return;
    setLoading(true);
    const r = await buscarColaborador(query);
    setResult(r);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-4 pb-20 pt-36 sm:pt-40">
      <div className="w-full max-w-md">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Verificación de Identidad
        </p>
        <h1 className="mt-3 text-center text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
          Validador de <span className="text-gold">Colaboradores</span>
        </h1>
        <p className="mt-4 text-center text-slate-600">
          Escribe el código que aparece en el carné del colaborador para confirmarlo.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            placeholder="Ej. SM AC 03"
            className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-gold"
          />
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy-900 transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "..." : "Verificar"}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {result?.status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative mx-auto mt-14 w-full max-w-[320px]"
            >
              <motion.div
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.35 }}
                className="absolute -top-7 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-emerald-500 shadow-lg"
              >
                <Check size={28} strokeWidth={3} className="text-white" />
              </motion.div>

              {result.data.fotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.data.fotoUrl}
                  alt={result.data.nombre}
                  className="w-full rounded-2xl object-contain shadow-2xl"
                />
              ) : (
                <div className="flex aspect-[3/4] w-full items-center justify-center rounded-2xl bg-navy-900 text-7xl font-bold text-gold/40 shadow-2xl">
                  {result.data.nombre.charAt(0)}
                </div>
              )}
            </motion.div>
          )}

          {result?.status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6"
            >
              <p className="flex items-center gap-2 font-medium text-red-600">
                <XCircle size={18} />
                Código no registrado
              </p>
              <p className="mt-1 text-sm text-slate-600">
                El código &ldquo;{result.query}&rdquo; no se encuentra en nuestro
                directorio de colaboradores. Verifica el número en el carné o
                contáctanos si crees que se trata de un error.
              </p>
            </motion.div>
          )}

          {result?.status === "rate_limited" && (
            <motion.div
              key="rate_limited"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6"
            >
              <p className="font-medium text-amber-700">Demasiados intentos</p>
              <p className="mt-1 text-sm text-slate-600">{result.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

