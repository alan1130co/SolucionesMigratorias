"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

const WHATSAPP_NUMBER = "+13054984470";

// Mini-formulario sin backend: arma un mensaje y lo abre en WhatsApp,
// el mismo canal que ya usan todos los CTAs del sitio.
export function ContactForm({ className = "" }: { className?: string }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const text = [
      `Hola, soy ${name || "un nuevo contacto"}.`,
      contact && `Mi contacto: ${contact}.`,
      message && `Mensaje: ${message}`,
    ]
      .filter(Boolean)
      .join(" ");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 rounded-2xl border border-gold/10 bg-surface p-8 ${className}`}
    >
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
          Nombre
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre completo"
          className="w-full rounded-xl border border-slate-200 bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
          Teléfono o correo
        </label>
        <input
          type="text"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Cómo te contactamos"
          className="w-full rounded-xl border border-slate-200 bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
          Cuéntanos tu caso
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Breve descripción de tu situación migratoria"
          className="w-full resize-none rounded-xl border border-slate-200 bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-neutral-900 transition-transform hover:scale-[1.02]"
      >
        Enviar por WhatsApp
        <Send size={16} />
      </button>
    </form>
  );
}
