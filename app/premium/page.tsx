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
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-6xl">
        <section className="mt-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            MoodScape Premium
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            Sblocca percorsi, moodboard e suggerimenti più personalizzati.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#5A5A6E]">
            Questa è una pagina demo. Il pagamento non è attivo: più avanti
            collegheremo Stripe, login utente e gestione abbonamento.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article
            onClick={() => setSelectedPlan("free")}
            className={`cursor-pointer rounded-[2rem] p-6 shadow-xl shadow-black/5 transition ${
              selectedPlan === "free"
                ? "bg-[#EDE9FF] ring-2 ring-[#5B4FCF]"
                : "bg-white"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
              Free
            </p>

            <h2 className="mt-4 text-3xl font-bold">Gratis</h2>

            <p className="mt-3 text-[#5A5A6E]">
              Per iniziare a esplorare mood, vibe e luoghi consigliati.
            </p>

            <ul className="mt-6 space-y-3">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm">
                  <span className="font-bold text-[#5B4FCF]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/explore"
              className="mt-8 block rounded-full bg-white px-6 py-3 text-center font-semibold text-[#1A1A2E]"
            >
              Continua gratis
            </Link>
          </article>

          <article
            onClick={() => setSelectedPlan("premium")}
            className={`cursor-pointer rounded-[2rem] p-6 shadow-xl shadow-black/5 transition ${
              selectedPlan === "premium"
                ? "bg-[#1A1A2E] text-white ring-2 ring-[#5B4FCF]"
                : "bg-white text-[#1A1A2E]"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#BDB7FF]">
              Premium
            </p>

            <h2 className="mt-4 text-3xl font-bold">€4,99/mese</h2>

            <p
              className={`mt-3 ${
                selectedPlan === "premium" ? "text-white/70" : "text-[#5A5A6E]"
              }`}
            >
              Per chi vuole creare, salvare e ottimizzare esperienze più
              complete.
            </p>

            <ul className="mt-6 space-y-3">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm">
                  <span className="font-bold text-[#BDB7FF]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={(event) => {
                event.stopPropagation();
                alert("Demo: il checkout Stripe verrà aggiunto più avanti.");
              }}
              className="mt-8 w-full rounded-full bg-[#5B4FCF] px-6 py-3 text-center font-semibold text-white"
            >
              Simula upgrade
            </button>
          </article>
        </section>

        <section className="mt-10 rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5">
          <h2 className="text-2xl font-bold">Cosa faremo nella versione reale</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#F7F4EF] p-5">
              <p className="font-bold text-[#5B4FCF]">1. Login</p>
              <p className="mt-2 text-sm leading-6 text-[#5A5A6E]">
                L’utente dovrà avere un profilo per gestire il piano.
              </p>
            </div>

            <div className="rounded-3xl bg-[#F7F4EF] p-5">
              <p className="font-bold text-[#5B4FCF]">2. Stripe</p>
              <p className="mt-2 text-sm leading-6 text-[#5A5A6E]">
                Il checkout verrà collegato a un abbonamento vero.
              </p>
            </div>

            <div className="rounded-3xl bg-[#F7F4EF] p-5">
              <p className="font-bold text-[#5B4FCF]">3. Paywall</p>
              <p className="mt-2 text-sm leading-6 text-[#5A5A6E]">
                Le feature premium saranno bloccate per gli utenti free.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}