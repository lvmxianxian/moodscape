"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";

type DbPlace = {
  slug: string;
  name: string;
  city: string;
  area: string;
  mood: string;
  vibe: string;
  description: string;
  price: string;
  time: string;
  social_level: string | null;
  image_url: string | null;
};

const budgetOptions = ["Tutti", "Gratis", "€", "€€", "€€€"];
const tempoOptions = ["Tutti", "Fino a 60 min", "1-2h", "Più di 2h"];
const compagniaOptions = [
  "Tutti",
  "Tranquillo",
  "Silenzioso",
  "Sociale",
  "Affollato",
];

function parseMinutes(time: string): number | null {
  if (!time) return null;
  const lower = time.toLowerCase();
  // matches "45 min", "60min", "1h", "1h 30m", "2 ore", "2h30"
  const hMatch = lower.match(/(\d+)\s*(?:h|ore|ora)/);
  const mMatch = lower.match(/(\d+)\s*(?:m|min|minuti)/);
  let total = 0;
  if (hMatch) total += parseInt(hMatch[1], 10) * 60;
  if (mMatch) total += parseInt(mMatch[1], 10);
  if (total === 0) {
    // fallback: just a bare number = minutes
    const num = lower.match(/(\d+)/);
    if (num) total = parseInt(num[1], 10);
  }
  return total > 0 ? total : null;
}

function FeedContent() {
  const searchParams = useSearchParams();
  const selectedMood = searchParams.get("mood");
  const selectedVibe = searchParams.get("vibe");

  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [fallbackPlaces, setFallbackPlaces] = useState<DbPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [budget, setBudget] = useState("Tutti");
  const [tempo, setTempo] = useState("Tutti");
  const [compagnia, setCompagnia] = useState("Tutti");
  const [area, setArea] = useState("Tutte");

  useEffect(() => {
    let cancelled = false;

    const timeout = window.setTimeout(() => {
      if (!cancelled) {
        setLoading(false);
        setMessage(
          "Il caricamento sta impiegando troppo tempo. Controlla Supabase e riprova.",
        );
      }
    }, 7000);

    async function loadPlaces() {
      setLoading(true);
      setMessage("");
      setPlaces([]);
      setFallbackPlaces([]);

      try {
        let query = supabase
          .from("places")
          .select(
            "slug,name,city,area,mood,vibe,description,price,time,social_level,image_url",
          )
          .order("created_at", { ascending: true });

        if (selectedMood) query = query.eq("mood", selectedMood);
        if (selectedVibe) query = query.eq("vibe", selectedVibe);

        const { data, error } = await query;

        if (cancelled) return;

        if (error) {
          setMessage(error.message);
          return;
        }

        const exactPlaces = data ?? [];
        setPlaces(exactPlaces);

        if (exactPlaces.length === 0) {
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("places")
            .select(
              "slug,name,city,area,mood,vibe,description,price,time,social_level,image_url",
            )
            .order("created_at", { ascending: true })
            .limit(12);

          if (cancelled) return;

          if (fallbackError) {
            setMessage(fallbackError.message);
            return;
          }

          setFallbackPlaces(fallbackData ?? []);
        }
      } catch (error) {
        if (!cancelled) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Errore durante il caricamento dei luoghi.",
          );
        }
      } finally {
        window.clearTimeout(timeout);
        if (!cancelled) setLoading(false);
      }
    }

    loadPlaces();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [selectedMood, selectedVibe]);

  const hasUrlFilters = Boolean(selectedMood || selectedVibe);

  const baseFilterText = useMemo(() => {
    if (selectedMood && selectedVibe) return `${selectedMood} · ${selectedVibe}`;
    if (selectedMood) return selectedMood;
    if (selectedVibe) return selectedVibe;
    return "Tutti i mood e tutte le vibe";
  }, [selectedMood, selectedVibe]);

  const sourcePlaces = places.length > 0 ? places : fallbackPlaces;

  const areaOptions = useMemo(() => {
    const set = new Set<string>();
    sourcePlaces.forEach((place) => {
      if (place.area) set.add(place.area);
    });
    return ["Tutte", ...Array.from(set).sort()];
  }, [sourcePlaces]);

  const visiblePlaces = useMemo(() => {
    return sourcePlaces.filter((place) => {
      if (budget !== "Tutti" && place.price !== budget) return false;
      if (area !== "Tutte" && place.area !== area) return false;
      if (compagnia !== "Tutti" && place.social_level !== compagnia)
        return false;

      if (tempo !== "Tutti") {
        const minutes = parseMinutes(place.time);
        if (minutes === null) return false;
        if (tempo === "Fino a 60 min" && minutes > 60) return false;
        if (tempo === "1-2h" && (minutes <= 60 || minutes > 120)) return false;
        if (tempo === "Più di 2h" && minutes <= 120) return false;
      }

      return true;
    });
  }, [sourcePlaces, budget, tempo, compagnia, area]);

  const activeUiFilters = [
    budget !== "Tutti" ? `Budget: ${budget}` : null,
    tempo !== "Tutti" ? `Tempo: ${tempo}` : null,
    compagnia !== "Tutti" ? `Compagnia: ${compagnia}` : null,
    area !== "Tutte" ? `Zona: ${area}` : null,
  ].filter(Boolean);

  function resetUiFilters() {
    setBudget("Tutti");
    setTempo("Tutti");
    setCompagnia("Tutti");
    setArea("Tutte");
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                Feed MoodScape
              </p>

              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Luoghi per la tua vibe del momento.
              </h1>
            </div>

            <Link
              href="/explore"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm ring-1 ring-black/5"
            >
              ✦
            </Link>
          </div>

          <div className="mt-6 rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
                  Filtro mood &amp; vibe
                </p>

                <p className="mt-1 text-base font-bold text-[#111111]">
                  {baseFilterText}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {hasUrlFilters && (
                  <Link
                    href="/feed"
                    className="rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white"
                  >
                    Rimuovi
                  </Link>
                )}

                <Link
                  href="/"
                  className="rounded-full bg-[#F1F1EE] px-5 py-3 text-sm font-bold text-[#111111]"
                >
                  Cambia mood
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
            <button
              type="button"
              onClick={() => setFiltersOpen((current) => !current)}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
                  Filtri pratici
                </p>

                <p className="mt-1 text-base font-bold text-[#111111]">
                  {activeUiFilters.length === 0
                    ? "Budget, tempo, compagnia, zona"
                    : activeUiFilters.join(" · ")}
                </p>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1F1EE] text-base font-bold">
                {filtersOpen ? "−" : "+"}
              </span>
            </button>

            {filtersOpen && (
              <div className="mt-5 grid gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                    Budget
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {budgetOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setBudget(option)}
                        className={`rounded-full px-4 py-2 text-sm font-bold ${
                          budget === option
                            ? "bg-[#111111] text-white"
                            : "bg-[#F7F7F5] text-[#111111]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                    Tempo
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tempoOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setTempo(option)}
                        className={`rounded-full px-4 py-2 text-sm font-bold ${
                          tempo === option
                            ? "bg-[#111111] text-white"
                            : "bg-[#F7F7F5] text-[#111111]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                    Compagnia
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {compagniaOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setCompagnia(option)}
                        className={`rounded-full px-4 py-2 text-sm font-bold ${
                          compagnia === option
                            ? "bg-[#111111] text-white"
                            : "bg-[#F7F7F5] text-[#111111]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                    Zona
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {areaOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setArea(option)}
                        className={`rounded-full px-4 py-2 text-sm font-bold ${
                          area === option
                            ? "bg-[#111111] text-white"
                            : "bg-[#F7F7F5] text-[#111111]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {activeUiFilters.length > 0 && (
                  <button
                    type="button"
                    onClick={resetUiFilters}
                    className="mt-2 rounded-full bg-[#F1F1EE] px-5 py-3 text-sm font-bold text-[#111111]"
                  >
                    Azzera filtri pratici
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {loading && (
          <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 text-[#7A7A73] shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
            Caricamento luoghi...
          </section>
        )}

        {!loading && message && (
          <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight">
              Non riesco a caricare i luoghi.
            </h2>

            <p className="mt-3 leading-7 text-[#55554F]">{message}</p>

            <Link
              href="/feed"
              className="mt-5 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
            >
              Riprova
            </Link>
          </section>
        )}

        {!loading && !message && sourcePlaces.length === 0 && (
          <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight">
              Aggiungi luoghi al database.
            </h2>

            <p className="mt-3 leading-7 text-[#55554F]">
              Il Feed è pronto, ma in Supabase non ci sono ancora luoghi da
              mostrare.
            </p>
          </section>
        )}

        {!loading &&
          !message &&
          sourcePlaces.length > 0 &&
          visiblePlaces.length === 0 && (
            <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
              <h2 className="text-2xl font-bold tracking-tight">
                Nessun luogo con questi filtri.
              </h2>

              <p className="mt-3 leading-7 text-[#55554F]">
                Prova ad allargare budget, tempo o zona.
              </p>

              <button
                type="button"
                onClick={resetUiFilters}
                className="mt-5 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
              >
                Azzera filtri pratici
              </button>
            </section>
          )}

        {!loading && !message && visiblePlaces.length > 0 && (
          <section className="mx-auto mt-6 grid max-w-md gap-4 md:grid-cols-2 lg:max-w-7xl lg:grid-cols-3 xl:grid-cols-4">
            {visiblePlaces.map((place) => (
              <Link
                key={place.slug}
                href={`/place/${place.slug}`}
                className="group overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
              >
                <PlaceImage
                  imageUrl={place.image_url}
                  name={place.name}
                  vibe={place.vibe}
                  className="h-60"
                />

                <div className="p-2 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-[#111111]">
                        {place.name}
                      </h2>

                      <p className="mt-1 text-sm font-semibold text-[#7A7A73]">
                        {place.city} · {place.area}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#F1F1EE] px-3 py-2 text-xs font-bold text-[#111111]">
                      {place.price}
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#55554F]">
                    {place.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                      {place.mood}
                    </span>

                    <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                      {place.time}
                    </span>

                    {place.social_level && (
                      <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                        {place.social_level}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default function FeedPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
          <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            Caricamento feed...
          </div>
        </main>
      }
    >
      <FeedContent />
    </Suspense>
  );
}
