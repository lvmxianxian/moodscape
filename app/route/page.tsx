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
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-6xl">
        <section className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Vibe Route
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Un itinerario costruito sulla tua atmosfera.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5A5A6E]">
            Questa è una demo di percorso. Più avanti la route verrà generata
            automaticamente da una Vibe List, con mappa, tempi reali e
            ottimizzazione AI per utenti premium.
          </p>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#5B4FCF]">
                  Roma · 3 tappe · 3 ore circa
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  Dark Academia Morning
                </h2>
              </div>

              <button
                onClick={() => setSaved(!saved)}
                className={`rounded-full px-5 py-3 font-semibold ${
                  saved
                    ? "bg-[#1A1A2E] text-white"
                    : "bg-[#5B4FCF] text-white"
                }`}
              >
                {saved ? "Salvata ✓" : "Salva route"}
              </button>
            </div>

            <div className="mt-8 space-y-5">
              {routeStops.map((stop, index) => (
                <article
                  key={stop.name}
                  className="relative rounded-3xl border border-[#E8E1D8] p-5"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EDE9FF] font-bold text-[#5B4FCF]">
                      {index + 1}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#5B4FCF]">
                        {stop.time} · {stop.duration}
                      </p>

                      <h3 className="mt-1 text-2xl font-bold">{stop.name}</h3>

                      <p className="mt-1 text-sm text-[#5A5A6E]">
                        {stop.area} · {stop.vibe}
                      </p>

                      <p className="mt-4 leading-7 text-[#4B4B5F]">
                        {stop.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] bg-[#1A1A2E] p-6 text-white shadow-xl shadow-black/10">
            <h2 className="text-2xl font-bold">Riepilogo percorso</h2>

            <div className="mt-6 space-y-4 text-white/80">
              <div className="rounded-3xl bg-white/10 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                  Mood
                </p>
                <p className="mt-2 text-xl font-bold text-white">Curioso</p>
              </div>

              <div className="rounded-3xl bg-white/10 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                  Vibe
                </p>
                <p className="mt-2 text-xl font-bold text-white">
                  Dark academia
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                  Budget
                </p>
                <p className="mt-2 text-xl font-bold text-white">€–€€</p>
              </div>
            </div>

            <Link
              href="/map"
              className="mt-8 block rounded-full bg-white px-6 py-3 text-center font-semibold text-[#1A1A2E]"
            >
              Vedi sulla mappa
            </Link>

            <Link
              href="/vibe-lists"
              className="mt-3 block rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-white"
            >
              Torna alle Vibe Lists
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}