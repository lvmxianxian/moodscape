"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";

type SavedPlace = {
  place_slug: string;
  created_at: string;
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

type FilterMode = "Tutti" | "Per mood" | "Per vibe";

export default function MoodboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [savedRows, setSavedRows] = useState<SavedPlace[]>([]);
  const [filterMode, setFilterMode] = useState<FilterMode>("Tutti");
  const [activeTag, setActiveTag] = useState("Tutti");
  const [privacy, setPrivacy] = useState<"Privata" | "Condivisibile">(
    "Privata",
  );
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
        .select("place_slug,created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (savedError) {
        setMessage(savedError.message);
        setLoading(false);
        return;
      }

      const saved = savedData ?? [];
      setSavedRows(saved);

      const slugs = saved.map((row) => row.place_slug);

      if (slugs.length === 0) {
        setPlaces([]);
        setLoading(false);
        return;
      }

      const { data: placesData, error: placesError } = await supabase
        .from("places")
        .select(
          "slug,name,city,area,mood,vibe,description,price,time,image_url",
        )
        .in("slug", slugs);

      if (placesError) {
        setMessage(placesError.message);
        setLoading(false);
        return;
      }

      const orderedPlaces = slugs
        .map((slug) => placesData?.find((place) => place.slug === slug))
        .filter(Boolean) as DbPlace[];

      setPlaces(orderedPlaces);
      setLoading(false);
    }

    loadMoodboard();
  }, []);

  const tags = useMemo(() => {
    if (filterMode === "Tutti") return ["Tutti"];

    const values =
      filterMode === "Per mood"
        ? places.map((place) => place.mood)
        : places.map((place) => place.vibe);

    return ["Tutti", ...Array.from(new Set(values)).filter(Boolean)];
  }, [filterMode, places]);

  const visiblePlaces = useMemo(() => {
    if (filterMode === "Tutti" || activeTag === "Tutti") return places;

    if (filterMode === "Per mood") {
      return places.filter((place) => place.mood === activeTag);
    }

    return places.filter((place) => place.vibe === activeTag);
  }, [activeTag, filterMode, places]);

  function changeFilterMode(mode: FilterMode) {
    setFilterMode(mode);
    setActiveTag("Tutti");
  }

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
          <p className="text-sm font-semibold text-[#7A7A73]">
            Moodboard personale
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight">
            Accedi per vedere la tua moodboard.
          </h1>

          <p className="mt-4 leading-7 text-[#55554F]">
            Qui troverai i luoghi salvati, organizzabili per mood e vibe.
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
                Moodboard personale
              </p>

              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                I tuoi luoghi salvati.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Una bacheca personale per raccogliere posti, immagini e vibe.
                Puoi organizzarla per mood o per vibe e scegliere se tenerla
                privata o renderla condivisibile.
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
                Salvati
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">
                {new Set(places.map((place) => place.mood)).size}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Mood
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">
                {new Set(places.map((place) => place.vibe)).size}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Vibe
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
                  Privacy moodboard
                </p>
                <p className="mt-1 text-base font-bold">
                  Stato: {privacy}
                </p>
              </div>

              <div className="flex gap-2">
                {(["Privata", "Condivisibile"] as const).map((value) => (
                  <button
                    key={value}
                    onClick={() => setPrivacy(value)}
                    className={`rounded-full px-4 py-3 text-sm font-bold ${
                      privacy === value
                        ? "bg-[#111111] text-white"
                        : "bg-[#F1F1EE] text-[#111111]"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Organizza
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {(["Tutti", "Per mood", "Per vibe"] as FilterMode[]).map(
                (mode) => (
                  <button
                    key={mode}
                    onClick={() => changeFilterMode(mode)}
                    className={`rounded-full px-4 py-3 text-sm font-bold ${
                      filterMode === mode
                        ? "bg-[#111111] text-white"
                        : "bg-[#F1F1EE] text-[#111111]"
                    }`}
                  >
                    {mode}
                  </button>
                ),
              )}
            </div>

            {filterMode !== "Tutti" && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`shrink-0 rounded-full px-4 py-3 text-sm font-bold ${
                      activeTag === tag
                        ? "bg-[#111111] text-white"
                        : "bg-[#F7F7F5] text-[#111111]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {message && (
            <div className="mt-5 rounded-[1.5rem] bg-white p-4 text-sm font-semibold text-[#55554F] shadow-sm ring-1 ring-black/5">
              {message}
            </div>
          )}
        </section>

        <section className="mx-auto mt-8 max-w-md pb-10 lg:max-w-7xl">
          {places.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-2xl font-bold tracking-tight">
                Non hai ancora salvato luoghi.
              </h2>

              <p className="mt-3 leading-7 text-[#55554F]">
                Apri il Feed, entra in un luogo e clicca “Salva” per iniziare a
                costruire la tua moodboard.
              </p>

              <Link
                href="/feed"
                className="mt-5 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
              >
                Vai al Feed
              </Link>
            </div>
          ) : visiblePlaces.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-2xl font-bold tracking-tight">
                Nessun luogo in questo filtro.
              </h2>

              <p className="mt-3 leading-7 text-[#55554F]">
                Cambia mood o vibe per vedere altri luoghi salvati.
              </p>
            </div>
          ) : (
            <div className="columns-1 gap-4 md:columns-2 lg:columns-3 xl:columns-4">
              {visiblePlaces.map((place) => (
                <Link
                  key={place.slug}
                  href={`/place/${place.slug}`}
                  className="mb-4 block break-inside-avoid overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                >
                  <PlaceImage
                    imageUrl={place.image_url}
                    name={place.name}
                    vibe={place.vibe}
                    className="h-64"
                  />

                  <div className="p-2 pt-5">
                    <p className="text-sm font-semibold text-[#7A7A73]">
                      {place.city} · {place.area}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold tracking-tight">
                      {place.name}
                    </h2>

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