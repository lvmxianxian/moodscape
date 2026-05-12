"use client";

import Link from "next/link";
import { useState } from "react";

const moods = [
  "Stressato",
  "Annoiato",
  "Curioso",
  "Romantico",
  "Energico",
  "Solo",
  "Sovraccarico",
  "In cerca di socialità",
];

const vibes = [
  "Dark academia",
  "Dolce vita",
  "Quiet luxury",
  "Vintage film",
  "Coastal mood",
  "Neon nightlife",
  "Romantic ruins",
  "Minimalismo giapponese",
  "Natura selvaggia",
  "City creative",
];

export default function SubmitPlacePage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/map"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
        >
          ← Torna alla mappa
        </Link>

        <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <p className="text-sm font-semibold text-[#7A7A73]">
            Mappa collaborativa
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Suggerisci un luogo.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#55554F]">
            Aiuta MoodScape a crescere: proponi un luogo, una vibe e un mood.
            In questa demo la proposta viene simulata; nella versione reale
            passerebbe da moderazione prima di apparire nella mappa.
          </p>

          {sent ? (
            <div className="mt-8 rounded-[1.5rem] bg-[#F7F7F5] p-5">
              <h2 className="text-2xl font-bold tracking-tight">
                Proposta inviata ✓
              </h2>
              <p className="mt-3 leading-7 text-[#55554F]">
                Grazie. Il luogo è stato mandato in revisione demo.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => setSent(false)}
                  className="rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
                >
                  Suggerisci un altro luogo
                </button>

                <Link
                  href="/map"
                  className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
                >
                  Apri mappa
                </Link>
              </div>
            </div>
          ) : (
            <form
              className="mt-8 grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <div>
                <label className="text-sm font-bold text-[#7A7A73]">
                  Nome luogo
                </label>
                <input
                  required
                  name="name"
                  placeholder="Es. Libreria nascosta, terrazza, giardino..."
                  className="mt-2 w-full rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] px-4 py-4 text-sm font-semibold outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-[#7A7A73]">
                  Città
                </label>
                <input
                  required
                  name="city"
                  placeholder="Es. Roma"
                  className="mt-2 w-full rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] px-4 py-4 text-sm font-semibold outline-none focus:border-[#111111]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-bold text-[#7A7A73]">
                    Mood
                  </label>
                  <select
                    required
                    name="mood"
                    className="mt-2 w-full rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] px-4 py-4 text-sm font-semibold outline-none focus:border-[#111111]"
                  >
                    <option value="">Scegli mood</option>
                    {moods.map((mood) => (
                      <option key={mood} value={mood}>
                        {mood}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-bold text-[#7A7A73]">
                    Vibe
                  </label>
                  <select
                    required
                    name="vibe"
                    className="mt-2 w-full rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] px-4 py-4 text-sm font-semibold outline-none focus:border-[#111111]"
                  >
                    <option value="">Scegli vibe</option>
                    {vibes.map((vibe) => (
                      <option key={vibe} value={vibe}>
                        {vibe}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-[#7A7A73]">
                  Descrizione breve
                </label>
                <textarea
                  required
                  name="description"
                  placeholder="Racconta perché questo posto ha una vibe speciale..."
                  rows={5}
                  className="mt-2 w-full rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] px-4 py-4 text-sm font-semibold outline-none focus:border-[#111111]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 rounded-full bg-[#111111] px-6 py-4 text-sm font-bold text-white"
              >
                Invia proposta
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}