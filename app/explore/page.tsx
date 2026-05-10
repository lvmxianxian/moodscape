"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const moods = [
  { id: "Stressato", label: "Stressato", emoji: "🌫️" },
  { id: "Annoiato", label: "Annoiato", emoji: "🫠" },
  { id: "Curioso", label: "Curioso", emoji: "👀" },
  { id: "Romantico", label: "Romantico", emoji: "🌹" },
  { id: "Energico", label: "Energico", emoji: "⚡" },
  { id: "Introspettivo", label: "Introspettivo", emoji: "🌙" },
  { id: "Sociale", label: "Sociale", emoji: "🪩" },
  { id: "Creativo", label: "Creativo", emoji: "🎨" },
  { id: "Nostalgico", label: "Nostalgico", emoji: "🎞️" },
  { id: "Avventuroso", label: "Avventuroso", emoji: "🧭" },
  { id: "Rilassato", label: "Rilassato", emoji: "🍃" },
  { id: "In cerca di ispirazione", label: "In cerca di ispirazione", emoji: "✨" },
  { id: "In cerca di comfort", label: "In cerca di comfort", emoji: "☕" },
  { id: "In cerca di novità", label: "In cerca di novità", emoji: "🗝️" },
  { id: "Un po’ malinconico", label: "Un po’ malinconico", emoji: "🌧️" },
  { id: "Da solo ma non troppo", label: "Da solo ma non troppo", emoji: "🕯️" },
  { id: "Con voglia di bellezza", label: "Con voglia di bellezza", emoji: "🏛️" },
  { id: "Con voglia di muovermi", label: "Con voglia di muovermi", emoji: "🚶" },
];

const vibes = [
  "Dark academia",
  "Dolce vita",
  "Quiet luxury",
  "Vintage film",
  "Neon nightlife",
  "Romantic ruins",
  "Cozy café",
  "Art gallery mood",
  "Old money",
  "Hidden garden",
  "Bookshop afternoon",
  "Rooftop sunset",
  "Indie sleaze",
  "Minimal chic",
  "Spiritual retreat",
  "Local authentic",
  "Rainy day",
  "Golden hour walk",
];

export default function ExplorePage() {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedVibe, setSelectedVibe] = useState("");

  const feedHref = useMemo(() => {
    const params = new URLSearchParams();

    if (selectedMood) params.set("mood", selectedMood);
    if (selectedVibe) params.set("vibe", selectedVibe);

    const query = params.toString();
    return query ? `/feed?${query}` : "/feed";
  }, [selectedMood, selectedVibe]);

  const canContinue = selectedMood && selectedVibe;

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8">
          <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
            Mood Check
          </p>

          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
            Scegli mood e atmosfera.
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#425653]">
            Seleziona come ti senti e la vibe che vuoi seguire. MoodScape userà
            questa combinazione per filtrare il Feed e mostrarti posti più
            coerenti.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
            1. Come ti senti oggi?
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
                    Usa questo mood per personalizzare la selezione di luoghi.
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
            2. Che vibe vuoi seguire?
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vibes.map((vibe) => {
              const active = selectedVibe === vibe;

              return (
                <button
                  key={vibe}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`rounded-[2rem] border p-5 text-left transition ${
                    active
                      ? "border-[#C99A57] bg-[#2A160E] text-[#F4EFE5] shadow-xl shadow-[#2A160E]/20"
                      : "border-[#D8B77A]/50 bg-[#F8F2E8] text-[#0E3532] hover:border-[#C99A57]"
                  }`}
                >
                  <div className="text-lg font-bold">{vibe}</div>

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

        <section className="sticky bottom-6 mt-14 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-4 shadow-2xl shadow-[#0E3532]/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                Scelta attiva
              </p>

              <p className="mt-1 text-sm font-bold text-[#0E3532]">
                {selectedMood || "Nessun mood"} · {selectedVibe || "Nessuna vibe"}
              </p>
            </div>

            <Link
              href={canContinue ? feedHref : "#"}
              className={`rounded-full px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] ${
                canContinue
                  ? "bg-[#0E3532] text-[#F4EFE5]"
                  : "pointer-events-none bg-[#E5D8C3] text-[#0E3532]/40"
              }`}
            >
              Mostrami i posti
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}