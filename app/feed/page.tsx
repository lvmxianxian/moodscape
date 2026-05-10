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
  image_url: string | null;
};

function FeedContent() {
  const searchParams = useSearchParams();
  const selectedMood = searchParams.get("mood");
  const selectedVibe = searchParams.get("vibe");

  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [fallbackPlaces, setFallbackPlaces] = useState<DbPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
            "slug,name,city,area,mood,vibe,description,price,time,image_url",
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
              "slug,name,city,area,mood,vibe,description,price,time,image_url",
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

  const hasFilters = Boolean(selectedMood || selectedVibe);

  const filterText = useMemo(() => {
    if (selectedMood && selectedVibe) return `${selectedMood} · ${selectedVibe}`;
    if (selectedMood) return selectedMood;
    if (selectedVibe) return selectedVibe;
    return "Tutti i mood e tutte le vibe";
  }, [selectedMood, selectedVibe]);

  const visiblePlaces = places.length > 0 ? places : fallbackPlaces;

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
                  Filtro attivo
                </p>

                <p className="mt-1 text-base font-bold text-[#111111]">
                  {filterText}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {hasFilters && (
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
              Aggiungi luoghi al database.
            </h2>

            <p className="mt-3 leading-7 text-[#55554F]">
              Il Feed è pronto, ma in Supabase non ci sono ancora luoghi da
              mostrare.
            </p>
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