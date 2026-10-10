"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "No se pudo iniciar sesión.");
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
    <main className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
      >
        <h1 className="mb-6 text-2xl font-bold text-white">Panel de administración</h1>

        {error && (
          <p className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <label htmlFor="username" className="mb-1 block text-sm text-white/70">
          Usuario
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
          className="mb-4 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-gold"
        />

        <label htmlFor="password" className="mb-1 block text-sm text-white/70">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="mb-6 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-gold"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gold py-3 font-medium text-navy transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
