"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
};

export default function FeedPage() {
  const searchParams = useSearchParams();
  const selectedMood = searchParams.get("mood");
  const selectedVibe = searchParams.get("vibe");

  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      setMessage("");

      let query = supabase
        .from("places")
        .select("slug,name,city,area,mood,vibe,description,price,time")
        .order("created_at", { ascending: true });

      if (selectedMood) {
        query = query.eq("mood", selectedMood);
      }

      if (selectedVibe) {
        query = query.eq("vibe", selectedVibe);
      }

      const { data, error } = await query;

      if (error) {
        setMessage(error.message);
      } else {
        setPlaces(data ?? []);
      }

      setLoading(false);
    }

    loadPlaces();
  }, [selectedMood, selectedVibe]);

  const hasFilters = Boolean(selectedMood || selectedVibe);

  const filterText = useMemo(() => {
    if (selectedMood && selectedVibe) {
      return `${selectedMood} · ${selectedVibe}`;
    }

    if (selectedMood) {
      return selectedMood;
    }

    if (selectedVibe) {
      return selectedVibe;
    }

    return "Tutti i mood e tutte le vibe";
  }, [selectedMood, selectedVibe]);

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
            Il Feed legge i luoghi da Supabase e filtra in base alla scelta fatta
            nella home.
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

        {message && (
          <section className="mt-12 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 font-bold text-[#2A160E]">
            {message}
          </section>
        )}

        {!loading && !message && places.length === 0 && (
          <section className="mt-12 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
            <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
              Nessun luogo trovato per questa combinazione.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-[#425653]">
              Per ora il database ha pochi luoghi. Prova a rimuovere i filtri,
              oppure scegli una vibe più vicina ai luoghi già inseriti.
            </p>

            <Link
              href="/feed"
              className="mt-6 inline-flex rounded-full bg-[#0E3532] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Mostra tutti i luoghi
            </Link>
          </section>
        )}

        <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {places.map((place) => (
            <Link
              key={place.slug}
              href={`/place/${place.slug}`}
              className="group overflow-hidden rounded-[2rem] border border-[#D8B77A]/40 bg-[#F8F2E8] p-4 shadow-xl shadow-[#0E3532]/5 transition hover:-translate-y-1 hover:border-[#C99A57]"
            >
              <div className="flex h-56 items-end rounded-[1.5rem] bg-[#0E3532] p-4">
                <span className="rounded-full bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                  {place.vibe}
                </span>
              </div>

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
      </div>
    </main>
  );
}