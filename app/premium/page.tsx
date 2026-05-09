"use client";

import Link from "next/link";
import { useState } from "react";

const freeFeatures = [
  "Accesso al Vibe Feed",
  "Esplorazione base della Vibe Map",
  "Fino a 5 Vibe Lists",
  "Moodboard base",
  "Filtri standard",
];

const premiumFeatures = [
  "Vibe Lists illimitate",
  "Vibe Route con AI",
  "Moodboard avanzata",
  "Filtri estetici granulari",
  "Salvataggio offline",
  "Raccolte curate dalla community",
  "Layer tematici sulla mappa",
];

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">(
    "premium",
  );

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8 text-center">
          <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
            MoodScape Premium
          </p>

          <h1 className="mx-auto mt-8 max-w-5xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
            Sblocca percorsi, moodboard e suggerimenti più personalizzati.
          </h1>

          <div className="mx-auto mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
            <div className="h-px flex-1 bg-[#C99A57]" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#425653]">
            Questa è una pagina demo. Il pagamento non è attivo: più avanti
            collegheremo Stripe, login utente e gestione abbonamento.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <article
            onClick={() => setSelectedPlan("free")}
            className={`cursor-pointer rounded-[2rem] border p-6 shadow-xl shadow-[#0E3532]/5 transition ${
              selectedPlan === "free"
                ? "border-[#C99A57] bg-[#F8F2E8]"
                : "border-[#D8B77A]/50 bg-[#F8F2E8]"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C99A57]">
              Free
            </p>

            <h2 className="mt-5 font-serif text-4xl font-bold text-[#2A160E]">
              Gratis
            </h2>

            <p className="mt-4 text-[#425653]">
              Per iniziare a esplorare mood, vibe e luoghi consigliati.
            </p>

            <ul className="mt-6 space-y-3">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm">
                  <span className="font-bold text-[#C99A57]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/explore"
              className="mt-8 block rounded-full border border-[#C99A57] bg-[#F4EFE5] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
            >
              Continua gratis
            </Link>
          </article>

          <article
            onClick={() => setSelectedPlan("premium")}
            className={`cursor-pointer rounded-[2rem] border p-6 shadow-xl shadow-[#0E3532]/10 transition ${
              selectedPlan === "premium"
                ? "border-[#C99A57] bg-[#0E3532] text-[#F4EFE5]"
                : "border-[#D8B77A]/50 bg-[#F8F2E8] text-[#0E3532]"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
              Premium
            </p>

            <h2 className="mt-5 font-serif text-4xl font-bold">
              €4,99/mese
            </h2>

            <p
              className={`mt-4 ${
                selectedPlan === "premium" ? "text-[#F4EFE5]/75" : "text-[#425653]"
              }`}
            >
              Per chi vuole creare, salvare e ottimizzare esperienze più
              complete.
            </p>

            <ul className="mt-6 space-y-3">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm">
                  <span className="font-bold text-[#D8B77A]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={(event) => {
                event.stopPropagation();
                alert("Demo: il checkout Stripe verrà aggiunto più avanti.");
              }}
              className="mt-8 w-full rounded-full bg-[#D8B77A] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
            >
              Simula upgrade
            </button>
          </article>
        </section>

        <section className="mt-12 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
          <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
            Cosa faremo nella versione reale
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["1. Login", "L’utente dovrà avere un profilo per gestire il piano."],
              ["2. Stripe", "Il checkout verrà collegato a un abbonamento vero."],
              ["3. Paywall", "Le feature premium saranno bloccate per gli utenti free."],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5"
              >
                <p className="font-bold text-[#0E3532]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[#425653]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}