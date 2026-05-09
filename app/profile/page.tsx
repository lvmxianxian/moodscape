"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { places, vibeLists } from "@/lib/mock-data";

const favoriteVibes = Array.from(
  new Set(places.map((place) => place.vibe)),
).slice(0, 4);

const frequentMoods = Array.from(
  new Set(places.map((place) => place.mood)),
).slice(0, 4);

const savedPlaces = places.slice(0, 3);
const createdLists = vibeLists.slice(0, 3);

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F4EF] px-6 py-16 text-[#1A1A2E]">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-xl shadow-black/5">
          <p className="text-[#5A5A6E]">Caricamento profilo...</p>
        </div>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-[#F7F4EF] px-6 py-16 text-[#1A1A2E]">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-xl shadow-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Profilo
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Accedi per vedere il tuo profilo.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-[#5A5A6E]">
            Il profilo ora è collegato a Supabase. Quando accedi, MoodScape può
            iniziare a collegare salvataggi, liste e preferenze al tuo account.
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
        <section className="mt-12 rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#EDE9FF] text-4xl">
                🌙
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
                  Profilo reale
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                  Valeria
                </h1>

                <p className="mt-1 text-sm font-semibold text-[#5B4FCF]">
                  {email}
                </p>

                <p className="mt-3 max-w-xl text-[#5A5A6E]">
                  Questo profilo ora legge la sessione Supabase. I dati sotto
                  sono ancora demo, ma l’account è reale.
                </p>
              </div>
            </div>

            <Link
              href="/moodboard"
              className="rounded-full bg-[#5B4FCF] px-6 py-3 text-center font-semibold text-white"
            >
              Apri moodboard
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <div className="rounded-3xl bg-[#F7F4EF] p-5">
              <p className="text-3xl font-bold">{savedPlaces.length}</p>
              <p className="mt-1 text-sm text-[#5A5A6E]">Luoghi salvati</p>
            </div>

            <div className="rounded-3xl bg-[#F7F4EF] p-5">
              <p className="text-3xl font-bold">{createdLists.length}</p>
              <p className="mt-1 text-sm text-[#5A5A6E]">Vibe Lists</p>
            </div>

            <div className="rounded-3xl bg-[#F7F4EF] p-5">
              <p className="text-3xl font-bold">128</p>
              <p className="mt-1 text-sm text-[#5A5A6E]">Follower</p>
            </div>

            <div className="rounded-3xl bg-[#F7F4EF] p-5">
              <p className="text-3xl font-bold">42</p>
              <p className="mt-1 text-sm text-[#5A5A6E]">Following</p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-black/5">
            <h2 className="text-2xl font-bold">Vibe preferite</h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {favoriteVibes.map((vibe) => (
                <span
                  key={vibe}
                  className="rounded-full bg-[#1A1A2E] px-4 py-2 text-sm font-semibold text-white"
                >
                  {vibe}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-black/5">
            <h2 className="text-2xl font-bold">Mood frequenti</h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {frequentMoods.map((mood) => (
                <span
                  key={mood}
                  className="rounded-full bg-[#EDE9FF] px-4 py-2 text-sm font-semibold text-[#5B4FCF]"
                >
                  {mood}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-black/5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Liste create</h2>

              <Link
                href="/vibe-lists/create"
                className="text-sm font-semibold text-[#5B4FCF]"
              >
                Crea lista →
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {createdLists.map((list) => (
                <div
                  key={list.title}
                  className="rounded-2xl border border-[#E8E1D8] p-4"
                >
                  <p className="font-bold">{list.title}</p>
                  <p className="mt-1 text-sm text-[#5A5A6E]">
                    {list.city} · {list.vibe} · {list.places} posti
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-black/5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Luoghi salvati</h2>

              <Link
                href="/moodboard"
                className="text-sm font-semibold text-[#5B4FCF]"
              >
                Apri moodboard →
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {savedPlaces.map((place) => (
                <Link
                  key={place.slug}
                  href={`/place/${place.slug}`}
                  className="block rounded-2xl border border-[#E8E1D8] p-4 transition hover:border-[#5B4FCF]"
                >
                  <p className="font-bold">{place.name}</p>
                  <p className="mt-1 text-sm text-[#5A5A6E]">
                    {place.area} · {place.mood} · {place.vibe}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}