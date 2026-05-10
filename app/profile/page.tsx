"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";

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
  image_url: string | null;
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
  const [savedPlaces, setSavedPlaces] = useState<DbPlace[]>([]);
  const [createdLists, setCreatedLists] = useState<DbVibeList[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfileData() {
      setLoading(true);
      setMessage("");

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

      if (slugs.length > 0) {
        const { data: placesData, error: placesError } = await supabase
          .from("places")
          .select("slug,name,city,area,mood,vibe,description,image_url")
          .in("slug", slugs);

        if (placesError) {
          setMessage(placesError.message);
        } else {
          const orderedPlaces = slugs
            .map((slug) => placesData?.find((place) => place.slug === slug))
            .filter(Boolean) as DbPlace[];

          setSavedPlaces(orderedPlaces);
        }
      }

      const { data: listData, error: listError } = await supabase
        .from("vibe_lists")
        .select("id,title,city,vibe,description,visibility,created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (listError) {
        setMessage(listError.message);
      } else {
        setCreatedLists(listData ?? []);
      }

      setLoading(false);
    }

    loadProfileData();
  }, []);

  const favoriteVibes = Array.from(
    new Set(savedPlaces.map((place) => place.vibe)),
  ).slice(0, 6);

  const frequentMoods = Array.from(
    new Set(savedPlaces.map((place) => place.mood)),
  ).slice(0, 6);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          Caricamento profilo...
        </div>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold text-[#7A7A73]">Profilo</p>

          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight">
            Accedi per vedere il tuo profilo.
          </h1>

          <p className="mt-4 leading-7 text-[#55554F]">
            Il profilo mostra i tuoi luoghi salvati, le Vibe Lists create e le
            statistiche personali.
          </p>

          <div className="mt-6 grid gap-3">
            <Link
              href="/login"
              className="rounded-full bg-[#111111] px-6 py-4 text-center text-sm font-bold text-white"
            >
              Accedi
            </Link>

            <Link
              href="/signup"
              className="rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
            >
              Crea account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-[#111111] text-3xl text-white">
                🌙
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#7A7A73]">
                  Profilo personale
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                  Il tuo spazio
                </h1>

                <p className="mt-1 truncate text-sm font-medium text-[#7A7A73]">
                  {email}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#55554F]">
              Qui trovi il riepilogo dei luoghi che hai salvato, delle liste che
              hai creato e delle vibe che ricorrono di più.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-2xl font-bold">{savedPlaces.length}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                  Luoghi
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-2xl font-bold">{createdLists.length}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                  Liste
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-2xl font-bold">{favoriteVibes.length}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                  Vibe
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link
                href="/moodboard"
                className="rounded-full bg-[#111111] px-5 py-3 text-center text-sm font-bold text-white"
              >
                Moodboard
              </Link>

              <Link
                href="/vibe-lists/create"
                className="rounded-full bg-[#F1F1EE] px-5 py-3 text-center text-sm font-bold text-[#111111]"
              >
                Crea lista
              </Link>

              <Link
                href="/feed"
                className="rounded-full bg-[#F1F1EE] px-5 py-3 text-center text-sm font-bold text-[#111111]"
              >
                Scopri luoghi
              </Link>
            </div>
          </div>
        </section>

        {message && (
          <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
            <h2 className="text-2xl font-bold">Errore</h2>
            <p className="mt-3 text-[#55554F]">{message}</p>
          </section>
        )}

        <section className="mx-auto mt-6 grid max-w-md gap-5 lg:max-w-7xl lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold tracking-tight">
              Vibe preferite
            </h2>

            {favoriteVibes.length === 0 ? (
              <p className="mt-4 leading-7 text-[#55554F]">
                Salva qualche luogo per vedere qui le tue vibe più ricorrenti.
              </p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                {favoriteVibes.map((vibe) => (
                  <span
                    key={vibe}
                    className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]"
                  >
                    {vibe}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold tracking-tight">
              Mood ricorrenti
            </h2>

            {frequentMoods.length === 0 ? (
              <p className="mt-4 leading-7 text-[#55554F]">
                Salva qualche luogo per vedere qui i mood più presenti.
              </p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                {frequentMoods.map((mood) => (
                  <span
                    key={mood}
                    className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]"
                  >
                    {mood}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto mt-8 grid max-w-md gap-8 pb-10 lg:max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                Liste create
              </h2>

              <Link
                href="/vibe-lists/create"
                className="text-sm font-bold text-[#7A7A73]"
              >
                Nuova
              </Link>
            </div>

            {createdLists.length === 0 ? (
              <div className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h3 className="text-2xl font-bold tracking-tight">
                  Nessuna lista ancora.
                </h3>

                <p className="mt-3 leading-7 text-[#55554F]">
                  Crea una Vibe List per organizzare luoghi e mood in una board.
                </p>
              </div>
            ) : (
              <div className="mt-4 grid gap-3">
                {createdLists.map((list) => (
                  <Link
                    key={list.id}
                    href={`/vibe-lists/${list.id}`}
                    className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5"
                  >
                    <p className="text-sm font-semibold text-[#7A7A73]">
                      {list.city} · {list.visibility}
                    </p>

                    <h3 className="mt-2 text-xl font-bold tracking-tight">
                      {list.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#55554F]">
                      {list.description || "Lista creata da te."}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                Luoghi salvati
              </h2>

              <Link href="/moodboard" className="text-sm font-bold text-[#7A7A73]">
                Tutti
              </Link>
            </div>

            {savedPlaces.length === 0 ? (
              <div className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h3 className="text-2xl font-bold tracking-tight">
                  Nessun luogo salvato.
                </h3>

                <p className="mt-3 leading-7 text-[#55554F]">
                  Apri il Feed e salva i luoghi che vuoi ritrovare.
                </p>
              </div>
            ) : (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {savedPlaces.slice(0, 4).map((place) => (
                  <Link
                    key={place.slug}
                    href={`/place/${place.slug}`}
                    className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1"
                  >
                    <PlaceImage
                      imageUrl={place.image_url}
                      name={place.name}
                      vibe={place.vibe}
                      className="h-44"
                    />

                    <div className="p-2 pt-4">
                      <p className="text-sm font-semibold text-[#7A7A73]">
                        {place.area} · {place.mood}
                      </p>

                      <h3 className="mt-2 text-xl font-bold tracking-tight">
                        {place.name}
                      </h3>
                    </div>
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