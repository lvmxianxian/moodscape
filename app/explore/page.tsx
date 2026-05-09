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
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8">
          <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
            Mood check
          </p>

          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
            Come ti senti oggi?
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#425653]">
            Scegli il tuo stato d’animo e l’atmosfera estetica che vuoi vivere.
            MoodScape userà questa combinazione per mostrarti luoghi, liste e
            percorsi più coerenti.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
            1. Scegli il tuo mood
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {moods.map((mood) => {
              const active = selectedMood === mood.id;

              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`rounded-[2rem] border p-5 text-left transition ${
                    active
                      ? "border-[#C99A57] bg-[#0E3532] text-[#F4EFE5] shadow-xl shadow-[#0E3532]/20"
                      : "border-[#D8B77A]/50 bg-[#F8F2E8] text-[#0E3532] hover:border-[#C99A57]"
                  }`}
                >
                  <div className="text-4xl">{mood.emoji}</div>

                  <div className="mt-5 text-lg font-bold">{mood.label}</div>

                  <p
                    className={`mt-2 text-sm leading-6 ${
                      active ? "text-[#F4EFE5]/75" : "text-[#425653]"
                    }`}
                  >
                    Seleziona questo mood per personalizzare la tua esperienza.
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
            2. Scegli la vibe
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vibes.map((vibe) => {
              const active = selectedVibe === vibe.id;

              return (
                <button
                  key={vibe.id}
                  onClick={() => setSelectedVibe(vibe.id)}
                  className={`rounded-[2rem] border p-5 text-left transition ${
                    active
                      ? "border-[#C99A57] bg-[#2A160E] text-[#F4EFE5] shadow-xl shadow-[#2A160E]/20"
                      : "border-[#D8B77A]/50 bg-[#F8F2E8] text-[#0E3532] hover:border-[#C99A57]"
                  }`}
                >
                  <div className="text-lg font-bold">{vibe.label}</div>

                  <p
                    className={`mt-3 text-sm leading-6 ${
                      active ? "text-[#F4EFE5]/75" : "text-[#425653]"
                    }`}
                  >
                    Scopri posti coerenti con questa atmosfera.
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <div className="sticky bottom-6 mt-14 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-4 shadow-2xl shadow-[#0E3532]/10">
          <Link
            href={canContinue ? "/feed" : "#"}
            className={`block rounded-full px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] ${
              canContinue
                ? "bg-[#0E3532] text-[#F4EFE5]"
                : "pointer-events-none bg-[#E5D8C3] text-[#0E3532]/40"
            }`}
          >
            Mostrami i posti
          </Link>
        </div>
      </div>
    </main>
  );
}