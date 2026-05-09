"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { places } from "@/lib/mock-data";

type SavedPlaceRow = {
  place_slug: string;
};

type DbVibeList = {
  id: string;
  title: string;
  city: string;
  vibe: string;
  description: string | null;
  visibility: string;
  created_at: string;
};

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [createdLists, setCreatedLists] = useState<DbVibeList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setEmail(null);
        setLoading(false);
        return;
      }

      setEmail(session.user.email ?? null);

      const { data: savedData } = await supabase
        .from("saved_places")
        .select("place_slug")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      const { data: listData } = await supabase
        .from("vibe_lists")
        .select("id,title,city,vibe,description,visibility,created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      setSavedSlugs(
        savedData ? savedData.map((row: SavedPlaceRow) => row.place_slug) : [],
      );

      setCreatedLists(listData ?? []);
      setLoading(false);
    }

    loadProfileData();
  }, []);

  const savedPlaces = places.filter((place) => savedSlugs.includes(place.slug));

  const favoriteVibes = Array.from(
    new Set(savedPlaces.map((place) => place.vibe)),
  ).slice(0, 4);

  const frequentMoods = Array.from(
    new Set(savedPlaces.map((place) => place.mood)),
  ).slice(0, 4);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 shadow-xl shadow-[#0E3532]/5">
          <p className="text-[#425653]">Caricamento profilo...</p>
        </div>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 shadow-xl shadow-[#0E3532]/5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
            Profilo
          </p>

          <h1 className="mt-5 font-serif text-4xl font-bold tracking-tight text-[#2A160E] md:text-6xl">
            Accedi per vedere il tuo profilo.
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#425653]">
            Il profilo è collegato a Supabase. Quando accedi, MoodScape mostra i
            tuoi luoghi salvati e le Vibe Lists che hai creato.
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
        <section className="mt-8 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5 md:p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#D8B77A] bg-[#0E3532] text-4xl text-[#F4EFE5]">
                🌙
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                  Profilo reale
                </p>

                <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[#2A160E]">
                  Valeria
                </h1>

                <p className="mt-2 text-sm font-bold text-[#0E3532]">
                  {email}
                </p>

                <p className="mt-4 max-w-xl leading-7 text-[#425653]">
                  Questo profilo ora legge dati reali da Supabase: luoghi salvati
                  e Vibe Lists create dall’utente loggato.
                </p>
              </div>
            </div>

            <Link
              href="/moodboard"
              className="rounded-full bg-[#0E3532] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Apri moodboard
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <div className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5">
              <p className="font-serif text-4xl font-bold text-[#2A160E]">
                {savedPlaces.length}
              </p>
              <p className="mt-1 text-sm text-[#425653]">Luoghi salvati</p>
            </div>

            <div className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5">
              <p className="font-serif text-4xl font-bold text-[#2A160E]">
                {createdLists.length}
              </p>
              <p className="mt-1 text-sm text-[#425653]">Vibe Lists create</p>
            </div>

            <div className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5">
              <p className="font-serif text-4xl font-bold text-[#2A160E]">
                {favoriteVibes.length}
              </p>
              <p className="mt-1 text-sm text-[#425653]">Vibe salvate</p>
            </div>

            <div className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5">
              <p className="font-serif text-4xl font-bold text-[#2A160E]">
                {frequentMoods.length}
              </p>
              <p className="mt-1 text-sm text-[#425653]">Mood ricorrenti</p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
              Vibe preferite
            </h2>

            {favoriteVibes.length === 0 ? (
              <p className="mt-5 leading-7 text-[#425653]">
                Salva qualche luogo per vedere qui le tue vibe preferite.
              </p>
            ) : (
              <div className="mt-5 flex flex-wrap gap-2">
                {favoriteVibes.map((vibe) => (
                  <span
                    key={vibe}
                    className="rounded-full border border-[#D8B77A] bg-[#0E3532] px-4 py-2 text-sm font-bold text-[#F4EFE5]"
                  >
                    {vibe}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
              Mood frequenti
            </h2>

            {frequentMoods.length === 0 ? (
              <p className="mt-5 leading-7 text-[#425653]">
                Salva qualche luogo per vedere qui i mood più presenti.
              </p>
            ) : (
              <div className="mt-5 flex flex-wrap gap-2">
                {frequentMoods.map((mood) => (
                  <span
                    key={mood}
                    className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-sm font-bold text-[#0E3532]"
                  >
                    {mood}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
                Liste create
              </h2>

              <Link
                href="/vibe-lists/create"
                className="text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
              >
                Crea lista →
              </Link>
            </div>

            {createdLists.length === 0 ? (
              <p className="mt-5 leading-7 text-[#425653]">
                Non hai ancora creato Vibe Lists.
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {createdLists.map((list) => (
                  <Link
                    key={list.id}
                    href={`/vibe-lists/${list.id}`}
                    className="block rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-4 transition hover:border-[#C99A57]"
                  >
                    <p className="font-bold text-[#2A160E]">{list.title}</p>
                    <p className="mt-1 text-sm text-[#425653]">
                      {list.city} · {list.vibe} · {list.visibility}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
                Luoghi salvati
              </h2>

              <Link
                href="/moodboard"
                className="text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
              >
                Apri moodboard →
              </Link>
            </div>

            {savedPlaces.length === 0 ? (
              <p className="mt-5 leading-7 text-[#425653]">
                Non hai ancora salvato luoghi.
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {savedPlaces.map((place) => (
                  <Link
                    key={place.slug}
                    href={`/place/${place.slug}`}
                    className="block rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-4 transition hover:border-[#C99A57]"
                  >
                    <p className="font-bold text-[#2A160E]">{place.name}</p>
                    <p className="mt-1 text-sm text-[#425653]">
                      {place.area} · {place.mood} · {place.vibe}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}