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

type PracticalFilter = {
  budget: string;
  time: string;
  company: string;
  area: string;
};

const budgetOptions = ["Tutti", "Gratis", "€", "€€", "€€€"];
const timeOptions = ["Tutti", "30 min", "1h", "2h", "Mezza giornata"];
const companyOptions = ["Tutti", "Solo", "Coppia", "Amici", "Gruppo"];
const areaOptions = [
  "Tutte",
  "Aventino",
  "Centro",
  "Centro storico",
  "Monti",
  "Pinciano",
  "Trevi",
  "Trastevere",
];

function matchesBudget(place: DbPlace, budget: string) {
  if (budget === "Tutti") return true;
  return place.price === budget;
}

function matchesTime(place: DbPlace, time: string) {
  if (time === "Tutti") return true;

  const value = place.time.toLowerCase();

  if (time === "30 min") {
    return (
      value.includes("30") ||
      value.includes("mezz") ||
      value.includes("breve")
    );
  }

  if (time === "1h") {
    return value.includes("1h") || value.includes("60");
  }

  if (time === "2h") {
    return value.includes("2h") || value.includes("120");
  }

  if (time === "Mezza giornata") {
    return (
      value.includes("3h") ||
      value.includes("4h") ||
      value.includes("mezza") ||
      value.includes("giornata")
    );
  }

  return true;
}

function matchesCompany(place: DbPlace, company: string) {
  if (company === "Tutti") return true;

  const text = `${place.social_level ?? ""} ${place.mood} ${place.vibe} ${
    place.description
  }`.toLowerCase();

  if (company === "Solo") {
    return (
      text.includes("solo") ||
      text.includes("silenz") ||
      text.includes("calm") ||
      text.includes("introspett")
    );
  }

  if (company === "Coppia") {
    return (
      text.includes("romant") ||
      text.includes("coppia") ||
      text.includes("dolce vita") ||
      text.includes("tramonto")
    );
  }

  if (company === "Amici") {
    return (
      text.includes("social") ||
      text.includes("amici") ||
      text.includes("bar") ||
      text.includes("drink") ||
      text.includes("nightlife")
    );
  }

  if (company === "Gruppo") {
    return (
      text.includes("gruppo") ||
      text.includes("evento") ||
      text.includes("social") ||
      text.includes("affoll")
    );
  }

  return true;
}

function matchesArea(place: DbPlace, area: string) {
  if (area === "Tutte") return true;
  return place.area === area;
}

function FeedContent() {
  const searchParams = useSearchParams();
  const selectedMood = searchParams.get("mood");
  const selectedVibe = searchParams.get("vibe");

  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [filters, setFilters] = useState<PracticalFilter>({
    budget: "Tutti",
    time: "Tutti",
    company: "Tutti",
    area: "Tutte",
  });

  useEffect(() => {
    let cancelled = false;

    async function loadPlaces() {
      setLoading(true);
      setMessage("");
      setPlaces([]);

      try {
        let query = supabase
          .from("places")
          .select(
            "slug,name,city,area,mood,vibe,description,price,time,social_level,image_url",
          )
          .order("created_at", { ascending: true });

        if (selectedMood) {
          query = query.eq("mood", selectedMood);
        }

        if (selectedVibe) {
          query = query.eq("vibe", selectedVibe);
        }

        const { data, error } = await query;

        if (cancelled) return;

        if (error) {
          setMessage(error.message);
          return;
        }

        setPlaces(data ?? []);
      } catch (error) {
        if (!cancelled) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Errore durante il caricamento dei luoghi.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPlaces();

    return () => {
      cancelled = true;
    };
  }, [selectedMood, selectedVibe]);

  const hasMoodOrVibeFilters = Boolean(selectedMood || selectedVibe);

  const filterText = useMemo(() => {
    if (selectedMood && selectedVibe) return `${selectedMood} · ${selectedVibe}`;
    if (selectedMood) return selectedMood;
    if (selectedVibe) return selectedVibe;
    return "Tutti i mood e tutte le vibe";
  }, [selectedMood, selectedVibe]);

  const visiblePlaces = useMemo(() => {
    return places.filter((place) => {
      return (
        matchesBudget(place, filters.budget) &&
        matchesTime(place, filters.time) &&
        matchesCompany(place, filters.company) &&
        matchesArea(place, filters.area)
      );
    });
  }, [filters, places]);

  function updateFilter(key: keyof PracticalFilter, value: string) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function resetPracticalFilters() {
    setFilters({
      budget: "Tutti",
      time: "Tutti",
      company: "Tutti",
      area: "Tutte",
    });
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

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                I risultati rispettano i criteri scelti: mood, estetica e filtri
                pratici. Se non ci sono match, MoodScape non mostra alternative
                generiche.
              </p>
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
                  Filtro attivo
                </p>

                <p className="mt-1 text-base font-bold text-[#111111]">
                  {filterText}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {hasMoodOrVibeFilters && (
                  <Link
                    href="/feed"
                    className="rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white"
                  >
                    Rimuovi mood/vibe
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

          <div className="mt-5 rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
                  Filtri pratici
                </p>
                <p className="mt-1 text-sm font-semibold text-[#55554F]">
                  Budget, tempo, compagnia e zona.
                </p>
              </div>

              <button
                onClick={resetPracticalFilters}
                className="rounded-full bg-[#F1F1EE] px-4 py-3 text-sm font-bold text-[#111111]"
              >
                Reset
              </button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#9A9A92]">
                  Budget
                </label>
                <select
                  value={filters.budget}
                  onChange={(event) =>
                    updateFilter("budget", event.target.value)
                  }
                  className="mt-2 w-full rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111] outline-none ring-1 ring-black/5"
                >
                  {budgetOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#9A9A92]">
                  Tempo
                </label>
                <select
                  value={filters.time}
                  onChange={(event) => updateFilter("time", event.target.value)}
                  className="mt-2 w-full rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111] outline-none ring-1 ring-black/5"
                >
                  {timeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#9A9A92]">
                  Compagnia
                </label>
                <select
                  value={filters.company}
                  onChange={(event) =>
                    updateFilter("company", event.target.value)
                  }
                  className="mt-2 w-full rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111] outline-none ring-1 ring-black/5"
                >
                  {companyOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#9A9A92]">
                  Zona
                </label>
                <select
                  value={filters.area}
                  onChange={(event) => updateFilter("area", event.target.value)}
                  className="mt-2 w-full rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111] outline-none ring-1 ring-black/5"
                >
                  {areaOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
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

        {!loading && !message && visiblePlaces.length === 0 && (
          <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight">
              Nessun luogo rispetta tutti i filtri scelti.
            </h2>

            <p className="mt-3 leading-7 text-[#55554F]">
              Prova a cambiare mood, estetica o filtri pratici. MoodScape ora
              mostra solo i posti che corrispondono davvero ai criteri scelti.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
              >
                Cambia mood
              </Link>

              <button
                onClick={resetPracticalFilters}
                className="rounded-full bg-[#F1F1EE] px-6 py-3 text-sm font-bold text-[#111111]"
              >
                Reset filtri pratici
              </button>
            </div>
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
                      {place.vibe}
                    </span>

                    <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                      {place.time}
                    </span>
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