"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type SavedPlaceRow = {
  place_slug: string;
};

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

export default function MoodboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [savedPlaces, setSavedPlaces] = useState<DbPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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

      const { data: savedData, error: savedError } = await supabase
        .from("saved_places")
        .select("place_slug")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (savedError) {
        setMessage(savedError.message);
        setLoading(false);
        return;
      }

      const slugs = savedData
        ? savedData.map((row: SavedPlaceRow) => row.place_slug)
        : [];

      setSavedSlugs(slugs);

      if (slugs.length === 0) {
        setSavedPlaces([]);
        setLoading(false);
        return;
      }

      const { data: placesData, error: placesError } = await supabase
        .from("places")
        .select("slug,name,city,area,mood,vibe,description,price,time")
        .in("slug", slugs);

      if (placesError) {
        setMessage(placesError.message);
      } else {
        const orderedPlaces = slugs
          .map((slug) => placesData?.find((place) => place.slug === slug))
          .filter(Boolean) as DbPlace[];

        setSavedPlaces(orderedPlaces);
      }

      setLoading(false);
    }

    loadSavedPlaces();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 shadow-xl shadow-[#0E3532]/5">
          <p className="text-[#425653]">Caricamento moodboard...</p>
        </div>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 shadow-xl shadow-[#0E3532]/5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
            Moodboard personale
          </p>

          <h1 className="mt-5 font-serif text-4xl font-bold tracking-tight text-[#2A160E] md:text-6xl">
            Accedi per vedere i tuoi luoghi salvati.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#425653]">
            La Moodboard è collegata a Supabase. Quando accedi, vedrai qui i
            luoghi che hai salvato davvero.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-full bg-[#0E3532] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Accedi
            </Link>

            <Link
              href="/signup"
              className="rounded-full border border-[#C99A57] bg-[#F4EFE5] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
            >
              Crea account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8">
          <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
            Moodboard personale
          </p>

          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
            I tuoi luoghi salvati.
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#425653]">
            Questa pagina legge i salvataggi reali dal database Supabase per{" "}
            <span className="font-bold text-[#0E3532]">{email}</span>.
          </p>
        </section>

        {message && (
          <section className="mt-10 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 font-bold text-[#2A160E]">
            {message}
          </section>
        )}

        {!message && savedPlaces.length === 0 ? (
          <section className="mt-12 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 shadow-xl shadow-[#0E3532]/5">
            <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
              Non hai ancora salvato luoghi.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-[#425653]">
              Vai nel Vibe Feed, apri un luogo e clicca “Salva nella
              moodboard”. Poi torna qui.
            </p>

            <Link
              href="/feed"
              className="mt-6 inline-flex rounded-full bg-[#0E3532] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Apri il Feed
            </Link>
          </section>
        ) : (
          <section className="mt-12 grid gap-6 md:grid-cols-3">
            {savedPlaces.map((place) => (
              <article
                key={place.slug}
                className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5"
              >
                <div className="flex h-48 items-end rounded-[1.5rem] bg-[#0E3532] p-4">
                  <span className="rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#F4EFE5]">
                    {place.vibe}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    {place.city} · {place.area} · {place.time}
                  </p>

                  <h2 className="mt-3 font-serif text-2xl font-bold text-[#2A160E]">
                    {place.name}
                  </h2>

                  <p className="mt-2 text-sm font-bold text-[#0E3532]">
                    Mood: {place.mood}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-[#425653]">
                    {place.description}
                  </p>

                  <Link
                    href={`/place/${place.slug}`}
                    className="mt-5 inline-flex text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
                  >
                    Apri dettaglio →
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}