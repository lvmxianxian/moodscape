"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const moods = [
  { id: "Stressato", label: "Stressata", emoji: "🌫️" },
  { id: "Annoiato", label: "Annoiata", emoji: "🫠" },
  { id: "Curioso", label: "Curiosa", emoji: "👀" },
  { id: "Romantico", label: "Romantica", emoji: "🌙" },
  { id: "Energico", label: "Energica", emoji: "⚡" },
  { id: "Introspettivo", label: "Introspettiva", emoji: "🌌" },
  { id: "Sociale", label: "Sociale", emoji: "🪩" },
  { id: "Creativo", label: "Creativa", emoji: "🎨" },
  { id: "Nostalgico", label: "Nostalgica", emoji: "🎞️" },
  { id: "Avventuroso", label: "Avventurosa", emoji: "🧭" },
  { id: "Rilassato", label: "Rilassata", emoji: "🌿" },
  { id: "In cerca di ispirazione", label: "In cerca di ispirazione", emoji: "✨" },
  { id: "In cerca di comfort", label: "In cerca di comfort", emoji: "☕" },
  { id: "In cerca di novità", label: "In cerca di novità", emoji: "🗝️" },
  { id: "Un po’ malinconico", label: "Un po’ malinconica", emoji: "🌧️" },
  { id: "Da solo ma non troppo", label: "Da sola ma non troppo", emoji: "🕯️" },
  { id: "Con voglia di bellezza", label: "Con voglia di bellezza", emoji: "🏛️" },
  { id: "Con voglia di muovermi", label: "Con voglia di muovermi", emoji: "🚶" },
];

const vibes = [
  "Dolce vita",
  "Dark academia",
  "Hidden garden",
  "Golden hour walk",
  "Art gallery mood",
  "Neon nightlife",
  "Cozy café",
  "Old money",
  "Romantic ruins",
  "Bookshop afternoon",
  "Rooftop sunset",
  "Quiet luxury",
  "Vintage film",
  "Indie sleaze",
  "Minimal chic",
  "Rainy day",
  "Local authentic",
  "Spiritual retreat",
  "Secret garden",
  "Soft nightlife",
  "Museum date",
  "City break",
  "Slow morning",
  "Sunset walk",
];

export default function ExplorePage() {
  const [selectedMood, setSelectedMood] = useState("Romantico");
  const [selectedVibe, setSelectedVibe] = useState("Dolce vita");

  const feedHref = useMemo(() => {
    const params = new URLSearchParams();

    if (selectedMood) params.set("mood", selectedMood);
    if (selectedVibe) params.set("vibe", selectedVibe);

    return `/feed?${params.toString()}`;
  }, [selectedMood, selectedVibe]);

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-5xl">
        <section className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#7A7A73]">
              Mood Check
            </p>

            <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Scegli come ti senti e che vibe vuoi seguire.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
              MoodScape usa questa combinazione per filtrare luoghi, eventi e
              contenuti della community.
            </p>
          </div>

          <Link
            href="/"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm ring-1 ring-black/5"
          >
            ←
          </Link>
        </section>

        <section className="mt-7 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Come ti senti?
              </h2>
              <p className="mt-1 text-sm font-medium text-[#7A7A73]">
                {moods.length} opzioni disponibili
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {moods.map((mood) => {
              const active = selectedMood === mood.id;

              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`rounded-[1.5rem] p-4 text-left shadow-sm ring-1 transition ${
                    active
                      ? "bg-[#111111] text-white ring-[#111111]"
                      : "bg-[#F7F7F5] text-[#111111] ring-black/5 hover:bg-white"
                  }`}
                >
                  <div className="text-2xl">{mood.emoji}</div>
                  <div className="mt-3 text-sm font-bold">{mood.label}</div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-7 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Che aesthetic vuoi?
              </h2>
              <p className="mt-1 text-sm font-medium text-[#7A7A73]">
                {vibes.length} vibe visibili, su più righe
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {vibes.map((vibe) => {
              const active = selectedVibe === vibe;

              return (
                <button
                  key={vibe}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`rounded-full px-4 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-[#111111] text-white"
                      : "bg-[#F7F7F5] text-[#111111] shadow-sm ring-1 ring-black/5 hover:bg-white"
                  }`}
                >
                  {vibe}
                </button>
              );
            })}
          </div>
        </section>

        <section className="sticky bottom-5 mt-7 rounded-[2rem] bg-white p-4 shadow-xl shadow-black/10 ring-1 ring-black/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
                Scelta attiva
              </p>
              <p className="mt-1 text-base font-bold text-[#111111]">
                {selectedMood} · {selectedVibe}
              </p>
            </div>

            <Link
              href={feedHref}
              className="rounded-full bg-[#111111] px-6 py-4 text-center text-sm font-bold text-white"
            >
              Mostrami i posti
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}