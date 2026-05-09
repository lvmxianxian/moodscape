"use client";

import Link from "next/link";
import { useState } from "react";

const routeStops = [
  {
    time: "10:00",
    name: "Biblioteca Angelica",
    area: "Centro storico",
    duration: "60 min",
    vibe: "Dark academia",
    description:
      "Inizia con una tappa silenziosa e contemplativa tra libri, architettura storica e atmosfera da studio segreto.",
  },
  {
    time: "11:30",
    name: "Caffè storico",
    area: "Centro storico",
    duration: "45 min",
    vibe: "Dolce vita",
    description:
      "Pausa lenta con caffè, tavolino all’aperto e mood da mattina romana.",
  },
  {
    time: "13:00",
    name: "Giardino degli Aranci",
    area: "Aventino",
    duration: "50 min",
    vibe: "Romantic ruins",
    description:
      "Vista panoramica, camminata morbida e atmosfera romantica per chiudere il percorso.",
  },
];

export default function RoutePage() {
  const [saved, setSaved] = useState(false);

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8">
          <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
            Vibe Route
          </p>

          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
            Un itinerario costruito sulla tua atmosfera.
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#425653]">
            Questa è una demo di percorso. Più avanti la route verrà generata
            automaticamente da una Vibe List, con mappa, tempi reali e
            ottimizzazione AI per utenti premium.
          </p>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                  Roma · 3 tappe · 3 ore circa
                </p>

                <h2 className="mt-3 font-serif text-4xl font-bold text-[#2A160E]">
                  Dark Academia Morning
                </h2>
              </div>

              <button
                onClick={() => setSaved(!saved)}
                className={`rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] ${
                  saved
                    ? "bg-[#2A160E] text-[#F4EFE5]"
                    : "bg-[#0E3532] text-[#F4EFE5]"
                }`}
              >
                {saved ? "Salvata ✓" : "Salva route"}
              </button>
            </div>

            <div className="mt-8 space-y-5">
              {routeStops.map((stop, index) => (
                <article
                  key={stop.name}
                  className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F4EFE5] p-5"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0E3532] font-bold text-[#F4EFE5]">
                      {index + 1}
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                        {stop.time} · {stop.duration}
                      </p>

                      <h3 className="mt-2 font-serif text-3xl font-bold text-[#2A160E]">
                        {stop.name}
                      </h3>

                      <p className="mt-2 text-sm font-semibold text-[#0E3532]">
                        {stop.area} · {stop.vibe}
                      </p>

                      <p className="mt-4 leading-7 text-[#425653]">
                        {stop.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] bg-[#0E3532] p-6 text-[#F4EFE5] shadow-xl shadow-[#0E3532]/10">
            <h2 className="font-serif text-3xl font-bold text-[#D8B77A]">
              Riepilogo percorso
            </h2>

            <div className="mt-6 space-y-4">
              {[
                ["Mood", "Curioso"],
                ["Vibe", "Dark academia"],
                ["Budget", "€–€€"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-[#D8B77A]/30 bg-[#F4EFE5]/10 p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
                    {label}
                  </p>
                  <p className="mt-2 font-serif text-2xl font-bold text-[#F4EFE5]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/map"
              className="mt-8 block rounded-full bg-[#F4EFE5] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
            >
              Vedi sulla mappa
            </Link>

            <Link
              href="/vibe-lists"
              className="mt-3 block rounded-full border border-[#D8B77A] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Torna alle Vibe Lists
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}