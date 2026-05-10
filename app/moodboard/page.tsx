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
  price: string;
  time: string;
  image_url: string | null;
};

export default function MoodboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMoodboard() {
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

      if (slugs.length === 0) {
        setPlaces([]);
        setLoading(false);
        return;
      }

      const { data: placesData, error: placesError } = await supabase
        .from("places")
        .select("slug,name,city,area,mood,vibe,description,price,time,image_url")
        .in("slug", slugs);

      if (placesError) {
        setMessage(placesError.message);
      } else {
        const orderedPlaces = slugs
          .map((slug) => placesData?.find((place) => place.slug === slug))
          .filter(Boolean) as DbPlace[];

        setPlaces(orderedPlaces);
      }

      setLoading(false);
    }

    loadMoodboard();
  }, []);

  const vibeCount = new Set(places.map((place) => place.vibe)).size;
  const moodCount = new Set(places.map((place) => place.mood)).size;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          Caricamento moodboard...
        </div>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold text-[#7A7A73]">Moodboard</p>

          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight">
            Accedi per vedere i tuoi luoghi salvati.
          </h1>

          <p className="mt-4 leading-7 text-[#55554F]">
            La moodboard salva i posti che vuoi ricordare, provare o organizzare
            in una Vibe List.
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
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                La tua raccolta personale
              </p>

              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Moodboard.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Qui trovi i luoghi salvati dal Feed e dalle pagine dettaglio.
                Usala come spazio personale prima di creare liste e percorsi.
              </p>
            </div>

            <Link
              href="/feed"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xl text-white shadow-sm"
            >
              +
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{places.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Luoghi
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{vibeCount}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Vibe
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{moodCount}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Mood
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold text-[#111111]">{email}</p>
            <p className="mt-1 text-sm font-medium text-[#7A7A73]">
              Account collegato a Supabase
            </p>
          </div>
        </section>

        {message && (
          <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
            <h2 className="text-2xl font-bold">Errore</h2>
            <p className="mt-3 text-[#55554F]">{message}</p>
          </section>
        )}

        <section className="mx-auto mt-8 max-w-md pb-10 lg:max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Luoghi salvati
            </h2>

            <Link href="/feed" className="text-sm font-bold text-[#7A7A73]">
              Apri Feed
            </Link>
          </div>

          {places.length === 0 ? (
            <div className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-2xl font-bold tracking-tight">
                Non hai ancora salvato luoghi.
              </h3>

              <p className="mt-3 leading-7 text-[#55554F]">
                Vai nel Feed, apri un luogo e clicca “Salva nella moodboard”.
              </p>

              <Link
                href="/feed"
                className="mt-5 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
              >
                Scopri luoghi
              </Link>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {places.map((place) => (
                <Link
                  key={place.slug}
                  href={`/place/${place.slug}`}
                  className="group overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                >
                  <PlaceImage
                    imageUrl={place.image_url}
                    name={place.name}
                    vibe={place.vibe}
                    className="h-56"
                  />

                  <div className="p-2 pt-5">
                    <p className="text-sm font-semibold text-[#7A7A73]">
                      {place.city} · {place.area}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {place.name}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#55554F]">
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
                        {place.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}