"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const moods = [
  "Stressato",
  "Annoiato",
  "Curioso",
  "Romantico",
  "Energico",
  "Introspettivo",
  "Sociale",
  "Creativo",
  "Nostalgico",
  "Avventuroso",
  "Rilassato",
  "In cerca di ispirazione",
  "In cerca di comfort",
  "In cerca di novità",
  "Un po’ malinconico",
  "Da solo ma non troppo",
  "Con voglia di bellezza",
  "Con voglia di muovermi",
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

const features = [
  {
    title: "Mood Check",
    href: "/explore",
    description: "Scegli come ti senti e che atmosfera vuoi seguire.",
  },
  {
    title: "Vibe Feed",
    href: "/feed",
    description: "Scopri luoghi consigliati in base a mood e vibe.",
  },
  {
    title: "Vibe Map",
    href: "/map",
    description: "Esplora i posti su una mappa reale con filtri estetici.",
  },
  {
    title: "Vibe Lists",
    href: "/vibe-lists",
    description: "Sfoglia raccolte di luoghi costruite intorno a una vibe.",
  },
  {
    title: "Vibe Route",
    href: "/route",
    description: "Guarda un itinerario demo con tappe e tempi stimati.",
  },
  {
    title: "Premium",
    href: "/premium",
    description: "Visualizza la pagina demo del modello freemium.",
  },
];

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedVibe, setSelectedVibe] = useState("");

  const feedHref = useMemo(() => {
    const params = new URLSearchParams();

    if (selectedMood) params.set("mood", selectedMood);
    if (selectedVibe) params.set("vibe", selectedVibe);

    const query = params.toString();
    return query ? `/feed?${query}` : "/feed";
  }, [selectedMood, selectedVibe]);

  const canExplore = selectedMood && selectedVibe;

  return (
    <main className="min-h-screen bg-[#F4EFE5] text-[#0E3532]">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
            Mood-based city discovery
          </p>

          <h1 className="max-w-xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
            Trova posti in base a come ti senti.
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#425653]">
            MoodScape ti aiuta a scoprire luoghi, percorsi e vibe nella tua
            città partendo dal tuo mood e dall’atmosfera che vuoi vivere.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/explore"
              className="rounded-full bg-[#0E3532] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Apri Mood Check
            </Link>

            <Link
              href={feedHref}
              className={`rounded-full border px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] ${
                canExplore
                  ? "border-[#C99A57] bg-[#F8F2E8] text-[#0E3532]"
                  : "pointer-events-none border-[#D8B77A]/60 bg-[#E8DDC8] text-[#0E3532]/40"
              }`}
            >
              Mostrami i posti
            </Link>
          </div>

          {canExplore && (
            <p className="mt-5 text-sm font-semibold text-[#425653]">
              Scelta attiva:{" "}
              <span className="font-bold text-[#0E3532]">{selectedMood}</span>{" "}
              +{" "}
              <span className="font-bold text-[#0E3532]">{selectedVibe}</span>
            </p>
          )}
        </div>

        <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-2xl shadow-[#0E3532]/10">
          <div className="rounded-[1.5rem] bg-[#0E3532] p-6 text-[#F4EFE5]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
              Come ti senti oggi?
            </p>

            <div className="mt-5 max-h-72 overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-3">
                {moods.map((mood) => {
                  const active = selectedMood === mood;

                  return (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${
                        active
                          ? "border-[#D8B77A] bg-[#D8B77A] text-[#0E3532]"
                          : "border-[#D8B77A]/30 bg-[#F4EFE5] text-[#0E3532]"
                      }`}
                    >
                      {mood}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
              Che vibe vuoi seguire?
            </p>

            <div className="mt-5 max-h-72 overflow-y-auto pr-2">
              <div className="flex flex-wrap gap-2">
                {vibes.map((vibe) => {
                  const active = selectedVibe === vibe;

                  return (
                    <button
                      key={vibe}
                      onClick={() => setSelectedVibe(vibe)}
                      className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] ${
                        active
                          ? "border-[#D8B77A] bg-[#D8B77A] text-[#0E3532]"
                          : "border-[#D8B77A] text-[#F4EFE5]"
                      }`}
                    >
                      {vibe}
                    </button>
                  );
                })}
              </div>
            </div>

            <Link
              href={feedHref}
              className={`mt-8 block rounded-full px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] ${
                canExplore
                  ? "bg-[#D8B77A] text-[#0E3532]"
                  : "pointer-events-none bg-[#F4EFE5]/20 text-[#F4EFE5]/40"
              }`}
            >
              Continua con questa vibe
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
            Demo app
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#2A160E] md:text-5xl">
            Tutte le sezioni della demo.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-[#425653]">
            Questa versione mostra il flusso principale dell’app: mood, feed,
            mappa, liste, route, moodboard, profilo e premium.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5 transition hover:-translate-y-1 hover:border-[#C99A57] hover:bg-[#0E3532] hover:text-[#F4EFE5]"
              >
                <h3 className="font-serif text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 opacity-80">
                  {feature.description}
                </p>

                <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em]">
                  Apri sezione →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}