"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { places } from "@/lib/mock-data";

type SavedPlaceRow = {
  place_slug: string;
};

export default function MoodboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSavedPlaces() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setEmail(null);
        setLoading(false);
        return;
      }

      setEmail(session.user.email ?? null);

      const { data, error } = await supabase
        .from("saved_places")
        .select("place_slug")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setSavedSlugs(data.map((row: SavedPlaceRow) => row.place_slug));
      }

      setLoading(false);
    }

    loadSavedPlaces();
  }, []);

  const savedPlaces = places.filter((place) => savedSlugs.includes(place.slug));

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F4EF] px-6 py-16 text-[#1A1A2E]">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-xl shadow-black/5">
          <p className="text-[#5A5A6E]">Caricamento moodboard...</p>
        </div>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-[#F7F4EF] px-6 py-16 text-[#1A1A2E]">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-xl shadow-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Moodboard personale
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Accedi per vedere i tuoi luoghi salvati.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-[#5A5A6E]">
            La Moodboard ora è collegata a Supabase. Quando accedi, vedrai qui i
            luoghi che hai salvato davvero.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-full bg-[#5B4FCF] px-7 py-3 text-center font-semibold text-white"
            >
              Accedi
            </Link>

            <Link
              href="/signup"
              className="rounded-full border border-[#D8D2F0] bg-white px-7 py-3 text-center font-semibold text-[#1A1A2E]"
            >
              Crea account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-6xl">
        <section className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Moodboard personale
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            I tuoi luoghi salvati.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5A5A6E]">
            Questa pagina ora legge i salvataggi reali dal database Supabase per:
            <span className="font-semibold text-[#5B4FCF]"> {email}</span>
          </p>
        </section>

        {savedPlaces.length === 0 ? (
          <section className="mt-10 rounded-[2rem] bg-white p-8 shadow-xl shadow-black/5">
            <h2 className="text-3xl font-bold">Non hai ancora salvato luoghi.</h2>

            <p className="mt-4 max-w-xl leading-7 text-[#5A5A6E]">
              Vai nel Vibe Feed, apri un luogo e clicca “Salva nella
              moodboard”. Poi torna qui.
            </p>

            <Link
              href="/feed"
              className="mt-6 inline-flex rounded-full bg-[#5B4FCF] px-6 py-3 font-semibold text-white"
            >
              Apri il Feed
            </Link>
          </section>
        ) : (
          <section className="mt-10 grid gap-6 md:grid-cols-3">
            {savedPlaces.map((place) => (
              <article
                key={place.slug}
                className="rounded-[2rem] bg-white p-5 shadow-lg shadow-black/5"
              >
                <div className="flex h-48 items-end rounded-[1.5rem] bg-[#EDE9FF] p-4">
                  <span className="rounded-full bg-[#1A1A2E] px-4 py-2 text-xs font-semibold text-white">
                    {place.vibe}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-[#5B4FCF]">
                    {place.city} · {place.area}
                  </p>

                  <h2 className="mt-2 text-xl font-bold">{place.name}</h2>

                  <p className="mt-1 text-sm font-semibold text-[#5B4FCF]">
                    Mood: {place.mood}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-[#5A5A6E]">
                    {place.description}
                  </p>

                  <Link
                    href={`/place/${place.slug}`}
                    className="mt-5 inline-flex text-sm font-semibold text-[#5B4FCF]"
                  >
                    Apri dettaglio →
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}

        <section className="mt-12 rounded-[2rem] bg-[#1A1A2E] p-6 text-white shadow-lg shadow-black/10">
          <h2 className="text-2xl font-bold">Ora questa parte è reale</h2>

          <p className="mt-3 max-w-2xl leading-7 text-white/70">
            Il bottone “Salva nella moodboard” scrive su Supabase e questa
            pagina legge i dati salvati dall’utente loggato.
          </p>
        </section>
      </div>
    </main>
  );
}