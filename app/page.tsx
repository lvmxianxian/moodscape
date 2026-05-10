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

const routes = [
  {
    slug: "roma-romantica-tramonto",
    title: "Roma romantica al tramonto",
    mood: "Romantico",
    vibes: ["Dolce vita", "Romantic ruins", "Rooftop sunset", "Sunset walk"],
    description:
      "Un percorso morbido tra viste panoramiche, scorci iconici e tappe perfette per una serata romantica.",
    price: "€9",
    duration: "2h 30min",
    stops: "5 tappe",
    emoji: "🌇",
  },
  {
    slug: "dark-academia-walk",
    title: "Dark academia walk",
    mood: "Curioso",
    vibes: ["Dark academia", "Bookshop afternoon", "Rainy day", "Vintage film"],
    description:
      "Biblioteche, cortili silenziosi e luoghi con atmosfera letteraria per una giornata lenta e curiosa.",
    price: "€7",
    duration: "2h",
    stops: "4 tappe",
    emoji: "📚",
  },
  {
    slug: "hidden-garden-route",
    title: "Giardini nascosti",
    mood: "Rilassato",
    vibes: ["Hidden garden", "Secret garden", "Spiritual retreat", "Slow morning"],
    description:
      "Una selezione di spazi verdi, cortili e pause tranquille per staccare dal ritmo della città.",
    price: "€8",
    duration: "2h 15min",
    stops: "5 tappe",
    emoji: "🌿",
  },
  {
    slug: "golden-hour-photo-walk",
    title: "Golden hour photo walk",
    mood: "Creativo",
    vibes: ["Golden hour walk", "Art gallery mood", "Minimal chic", "City break"],
    description:
      "Un itinerario visivo pensato per foto, architetture, dettagli estetici e luce calda di fine giornata.",
    price: "€10",
    duration: "3h",
    stops: "6 tappe",
    emoji: "📸",
  },
  {
    slug: "neon-nightlife-route",
    title: "Neon nightlife route",
    mood: "Sociale",
    vibes: ["Neon nightlife", "Soft nightlife", "Indie sleaze", "Local authentic"],
    description:
      "Una serata tra posti vivi, atmosfere notturne e tappe sociali da fare con amici o nuove conoscenze.",
    price: "€12",
    duration: "3h 30min",
    stops: "5 tappe",
    emoji: "🪩",
  },
];

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState("Romantico");
  const [selectedVibe, setSelectedVibe] = useState("Dolce vita");
  const [showAllVibes, setShowAllVibes] = useState(false);

  const visibleVibes = showAllVibes ? vibes : vibes.slice(0, 9);

  const feedHref = useMemo(() => {
    const params = new URLSearchParams();

    if (selectedMood) params.set("mood", selectedMood);
    if (selectedVibe) params.set("vibe", selectedVibe);

    return `/feed?${params.toString()}`;
  }, [selectedMood, selectedVibe]);

  const recommendedRoute = useMemo(() => {
    const exactMatch = routes.find(
      (route) =>
        route.mood === selectedMood && route.vibes.includes(selectedVibe),
    );

    if (exactMatch) return exactMatch;

    const moodMatch = routes.find((route) => route.mood === selectedMood);

    if (moodMatch) return moodMatch;

    const vibeMatch = routes.find((route) =>
      route.vibes.includes(selectedVibe),
    );

    return vibeMatch ?? routes[0];
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
              {showAllVibes ? `${vibes.length} opzioni` : "9 in evidenza"}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {visibleVibes.map((vibe) => {
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

          <button
            onClick={() => setShowAllVibes(!showAllVibes)}
            className="mt-4 w-full rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
          >
            {showAllVibes ? "Mostra meno vibe" : "Vedi altre vibe"}
          </button>
        </section>

        <section className="mt-7 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="flex items-start justify-between gap-4">
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
              className="shrink-0 rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white"
            >
              Apri
            </Link>
          </div>

          <div className="mt-5 rounded-[1.6rem] bg-[#F7F7F5] p-4 ring-1 ring-black/5">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-white text-3xl shadow-sm ring-1 ring-black/5">
                {recommendedRoute.emoji}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7A7A73]">
                  Percorso consigliato
                </p>

                <h4 className="mt-1 text-lg font-bold leading-tight">
                  {recommendedRoute.title}
                </h4>

                <p className="mt-2 text-sm leading-6 text-[#7A7A73]">
                  {recommendedRoute.description}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-[1rem] bg-white px-3 py-3 ring-1 ring-black/5">
                <p className="text-xs font-semibold text-[#7A7A73]">Prezzo</p>
                <p className="mt-1 text-sm font-bold">{recommendedRoute.price}</p>
              </div>

              <div className="rounded-[1rem] bg-white px-3 py-3 ring-1 ring-black/5">
                <p className="text-xs font-semibold text-[#7A7A73]">Durata</p>
                <p className="mt-1 text-sm font-bold">
                  {recommendedRoute.duration}
                </p>
              </div>

              <div className="rounded-[1rem] bg-white px-3 py-3 ring-1 ring-black/5">
                <p className="text-xs font-semibold text-[#7A7A73]">Tappe</p>
                <p className="mt-1 text-sm font-bold">{recommendedRoute.stops}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <Link
                href={`/routes/${recommendedRoute.slug}`}
                className="flex items-center justify-center rounded-full bg-[#111111] px-5 py-4 text-sm font-bold text-white"
              >
                Acquista percorso
              </Link>

              <Link
                href={feedHref}
                className="flex items-center justify-center rounded-full bg-white px-5 py-4 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
              >
                Vedi luoghi del match
              </Link>
            </div>
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