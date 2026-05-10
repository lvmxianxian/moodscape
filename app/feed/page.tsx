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
  const [suggestedPlaces, setSuggestedPlaces] = useState<DbPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const timeout = window.setTimeout(() => {
      if (!cancelled) {
        setLoading(false);
        setMessage(
          "Il caricamento sta impiegando troppo tempo. Controlla che la tabella places esista su Supabase e che le variabili Vercel siano corrette.",
        );
      }
    }, 7000);

    async function loadPlaces() {
      setLoading(true);
      setMessage("");
      setPlaces([]);
      setSuggestedPlaces([]);

      try {
        let query = supabase
          .from("places")
          .select(
            "slug,name,city,area,mood,vibe,description,price,time,image_url",
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

        const exactPlaces = data ?? [];
        setPlaces(exactPlaces);

        if (exactPlaces.length === 0 && (selectedMood || selectedVibe)) {
          let suggestionQuery = supabase
            .from("places")
            .select(
              "slug,name,city,area,mood,vibe,description,price,time,image_url",
            )
            .order("created_at", { ascending: true })
            .limit(8);

          if (selectedVibe) {
            suggestionQuery = suggestionQuery.eq("vibe", selectedVibe);
          } else if (selectedMood) {
            suggestionQuery = suggestionQuery.eq("mood", selectedMood);
          }

          const { data: suggestions, error: suggestionError } =
            await suggestionQuery;

          if (cancelled) return;

          if (suggestionError) {
            setMessage(suggestionError.message);
            return;
          }

          setSuggestedPlaces(suggestions ?? []);
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

        if (!cancelled) {
          setLoading(false);
        }
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

  const visiblePlaces = places.length > 0 ? places : suggestedPlaces;
  const showingSuggestions = places.length === 0 && suggestedPlaces.length > 0;

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]">
            <span className="h-3 w-3 rounded-full bg-[#C99A57]" />
            Vibe Feed
          </div>

          <h1 className="mt-10 max-w-4xl font-serif text-5xl font-bold leading-none tracking-tight text-[#2A160E] md:text-7xl">
            Posti scelti secondo il tuo umore.
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#425653]">
            Il Feed legge i luoghi da Supabase e filtra in base alla scelta
            fatta nella home.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-sm font-bold text-[#0E3532]">
              Filtro attivo: {filterText}
            </div>

            {hasFilters && (
              <Link
                href="/feed"
                className="rounded-full bg-[#0E3532] px-4 py-2 text-sm font-bold text-[#F4EFE5]"
              >
                Rimuovi filtri
              </Link>
            )}

            <Link
              href="/"
              className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-sm font-bold text-[#0E3532]"
            >
              Cambia mood
            </Link>
          </div>
        </section>

        {loading && (
          <section className="mt-12 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 text-[#425653]">
            Caricamento luoghi...
          </section>
        )}

        {!loading && message && (
          <section className="mt-12 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
            <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
              Errore nel caricamento dei luoghi.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-[#425653]">
              {message}
            </p>

            <Link
              href="/feed"
              className="mt-6 inline-flex rounded-full bg-[#0E3532] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Riprova
            </Link>
          </section>
        )}

        {!loading &&
          !message &&
          places.length === 0 &&
          suggestedPlaces.length === 0 && (
            <section className="mt-12 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
              <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
                Nessun luogo trovato.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-[#425653]">
                Non ci sono luoghi disponibili per questa selezione. Prova senza
                filtri oppure aggiungi più luoghi nella tabella places.
              </p>

              <Link
                href="/feed"
                className="mt-6 inline-flex rounded-full bg-[#0E3532] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
              >
                Mostra tutti i luoghi
              </Link>
            </section>
          )}

        {!loading && !message && showingSuggestions && (
          <section className="mt-12 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6">
            <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
              Nessun match perfetto, ma questi sono vicini.
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-[#425653]">
              MoodScape non ha ancora un posto con esattamente questa
              combinazione, quindi ti mostra luoghi con mood o vibe simili.
            </p>
          </section>
        )}

        {!loading && !message && visiblePlaces.length > 0 && (
          <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {visiblePlaces.map((place) => (
              <Link
                key={place.slug}
                href={`/place/${place.slug}`}
                className="group overflow-hidden rounded-[2rem] border border-[#D8B77A]/40 bg-[#F8F2E8] p-4 shadow-xl shadow-[#0E3532]/5 transition hover:-translate-y-1 hover:border-[#C99A57]"
              >
                <PlaceImage
                  imageUrl={place.image_url}
                  name={place.name}
                  vibe={place.vibe}
                />

                <div className="mt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-serif text-2xl font-bold text-[#2A160E]">
                      {place.name}
                    </h2>

                    <span className="rounded-full border border-[#D8B77A] px-3 py-1 text-xs font-bold text-[#0E3532]">
                      {place.price}
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    {place.city} · {place.mood} · {place.time}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-[#425653]">
                    {place.description}
                  </p>

                  <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532] transition group-hover:text-[#C99A57]">
                    Apri dettaglio →
                  </p>
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
        <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
            Caricamento feed...
          </div>
        </main>
      }
    >
      <FeedContent />
    </Suspense>
  );
}