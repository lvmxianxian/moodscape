"use client";

import { useState } from "react";
import Link from "next/link";

const moods = [
  { id: "stressato", label: "Stressato", emoji: "🌫️" },
  { id: "annoiato", label: "Annoiato", emoji: "🫠" },
  { id: "curioso", label: "Curioso", emoji: "👀" },
  { id: "romantico", label: "Romantico", emoji: "🌹" },
  { id: "energico", label: "Energico", emoji: "⚡" },
  { id: "sociale", label: "In cerca di socialità", emoji: "🪩" },
];

const vibes = [
  { id: "dark-academia", label: "Dark academia" },
  { id: "dolce-vita", label: "Dolce vita" },
  { id: "quiet-luxury", label: "Quiet luxury" },
  { id: "vintage-film", label: "Vintage film" },
  { id: "neon-nightlife", label: "Neon nightlife" },
  { id: "romantic-ruins", label: "Romantic ruins" },
];

export default function ExplorePage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);

  const canContinue = selectedMood && selectedVibe;

  return (
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-[#5B4FCF]">
          ← Torna alla home
        </Link>

        <section className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Mood check
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Come ti senti oggi e che atmosfera vuoi vivere?
          </h1>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold">1. Scegli il tuo mood</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {moods.map((mood) => {
              const active = selectedMood === mood.id;

              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`rounded-3xl border p-5 text-left transition ${
                    active
                      ? "border-[#5B4FCF] bg-[#EDE9FF] shadow-lg shadow-[#5B4FCF]/20"
                      : "border-[#E4DED4] bg-white hover:border-[#5B4FCF]/40"
                  }`}
                >
                  <div className="text-3xl">{mood.emoji}</div>
                  <div className="mt-4 font-semibold">{mood.label}</div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold">2. Scegli la vibe</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vibes.map((vibe) => {
              const active = selectedVibe === vibe.id;

              return (
                <button
                  key={vibe.id}
                  onClick={() => setSelectedVibe(vibe.id)}
                  className={`rounded-3xl border p-5 text-left transition ${
                    active
                      ? "border-[#1A1A2E] bg-[#1A1A2E] text-white"
                      : "border-[#E4DED4] bg-white hover:border-[#1A1A2E]/40"
                  }`}
                >
                  <div className="font-semibold">{vibe.label}</div>
                  <p
                    className={`mt-2 text-sm ${
                      active ? "text-white/70" : "text-[#6B6B7A]"
                    }`}
                  >
                    Scopri posti coerenti con questa atmosfera.
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <div className="sticky bottom-6 mt-12 rounded-3xl bg-white p-4 shadow-xl shadow-black/10">
          <Link
            href={canContinue ? "/feed" : "#"}
            className={`block rounded-full px-6 py-4 text-center font-semibold ${
              canContinue
                ? "bg-[#5B4FCF] text-white"
                : "pointer-events-none bg-gray-200 text-gray-400"
            }`}
          >
            Mostrami i posti
          </Link>
        </div>
      </div>
    </main>
  );
}