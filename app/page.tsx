"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const moods = [
  { label: "Calma", value: "Rilassato", emoji: "🌿" },
  { label: "Romantica", value: "Romantico", emoji: "🌙" },
  { label: "Curiosa", value: "Curioso", emoji: "👀" },
  { label: "Sociale", value: "Sociale", emoji: "🪩" },
  { label: "Creativa", value: "Creativo", emoji: "🎨" },
  { label: "Nostalgica", value: "Nostalgico", emoji: "🎞️" },
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

const previews = [
  {
    title: "Giardino degli Aranci",
    meta: "Romantico · Dolce vita",
    emoji: "🌇",
  },
  {
    title: "Biblioteca Angelica",
    meta: "Curioso · Dark academia",
    emoji: "📚",
  },
  {
    title: "Villa Borghese",
    meta: "Rilassato · Golden hour walk",
    emoji: "🌿",
  },
];

export default function HomePage() {
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
      <div className="mx-auto max-w-md">
        <section className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#7A7A73]">
              Bentornata
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              MoodScape
            </h1>
          </div>

          <Link
            href="/profile"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg shadow-sm ring-1 ring-black/5"
          >
            🌙
          </Link>
        </section>

        <section className="mt-6 overflow-hidden rounded-[2rem] bg-[#111111] p-6 text-white shadow-xl shadow-black/10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Scoperta basata sul mood
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight">
            Trova posti in base a come ti senti.
          </h2>

          <p className="mt-4 text-base leading-7 text-white/70">
            Scegli un mood e una vibe. MoodScape li trasforma in luoghi,
            eventi, liste e consigli dalla community.
          </p>

          <Link
            href={feedHref}
            className="mt-7 flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-bold text-[#111111]"
          >
            Mostrami i posti
          </Link>
        </section>

        <section className="mt-7">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight">
              Come ti senti?
            </h3>

            <Link
              href="/explore"
              className="text-sm font-semibold text-[#7A7A73]"
            >
              Vedi tutto
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {moods.map((mood) => {
              const active = selectedMood === mood.value;

              return (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`rounded-[1.5rem] p-4 text-left shadow-sm ring-1 transition ${
                    active
                      ? "bg-[#111111] text-white ring-[#111111]"
                      : "bg-white text-[#111111] ring-black/5"
                  }`}
                >
                  <div className="text-2xl">{mood.emoji}</div>
                  <div className="mt-3 text-sm font-bold">{mood.label}</div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-7">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight">
              Scegli la vibe
            </h3>

            <p className="text-sm font-semibold text-[#7A7A73]">
              {vibes.length} opzioni
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {vibes.map((vibe) => {
              const active = selectedVibe === vibe;

              return (
                <button
                  key={vibe}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`rounded-full px-4 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-[#111111] text-white"
                      : "bg-white text-[#111111] shadow-sm ring-1 ring-black/5"
                  }`}
                >
                  {vibe}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-7 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-tight">
                Match attuale
              </h3>
              <p className="mt-1 text-sm font-medium text-[#7A7A73]">
                {selectedMood} · {selectedVibe}
              </p>
            </div>

            <Link
              href={feedHref}
              className="rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white"
            >
              Apri
            </Link>
          </div>
        </section>

        <section className="mt-7">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight">
              Luoghi suggeriti
            </h3>

            <Link href="/feed" className="text-sm font-semibold text-[#7A7A73]">
              Feed
            </Link>
          </div>

          <div className="mt-4 grid gap-3">
            {previews.map((place) => (
              <Link
                key={place.title}
                href="/feed"
                className="flex items-center gap-4 rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-[#F1F1EE] text-3xl">
                  {place.emoji}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-base font-bold">
                    {place.title}
                  </h4>
                  <p className="mt-1 text-sm font-medium text-[#7A7A73]">
                    {place.meta}
                  </p>
                </div>

                <span className="text-xl text-[#7A7A73]">›</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-7 grid grid-cols-3 gap-3 pb-10">
          <Link
            href="/community"
            className="rounded-[1.5rem] bg-white p-4 text-center text-sm font-bold shadow-sm ring-1 ring-black/5"
          >
            Community
          </Link>

          <Link
            href="/events"
            className="rounded-[1.5rem] bg-white p-4 text-center text-sm font-bold shadow-sm ring-1 ring-black/5"
          >
            Eventi
          </Link>

          <Link
            href="/map"
            className="rounded-[1.5rem] bg-white p-4 text-center text-sm font-bold shadow-sm ring-1 ring-black/5"
          >
            Mappa
          </Link>
        </section>
      </div>
    </main>
  );
}