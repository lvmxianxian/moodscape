"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";

type DbVibeList = {
  id: string;
  user_id: string;
  title: string;
  city: string;
  vibe: string;
  description: string | null;
  visibility: string;
  created_at: string;
};

type ListPlaceRow = {
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

export default function VibeListDetailPage() {
  const params = useParams<{ id: string }>();
  const [list, setList] = useState<DbVibeList | null>(null);
  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const [routeCreated, setRouteCreated] = useState(false);

  useEffect(() => {
    async function loadList() {
      setLoading(true);
      setMessage("");

      const { data: listData, error: listError } = await supabase
        .from("vibe_lists")
        .select("id,user_id,title,city,vibe,description,visibility,created_at")
        .eq("id", params.id)
        .maybeSingle();

      if (listError) {
        setMessage(listError.message);
        setLoading(false);
        return;
      }

      if (!listData) {
        setList(null);
        setLoading(false);
        return;
      }

      setList(listData);

      const { data: rowsData, error: rowsError } = await supabase
        .from("vibe_list_places")
        .select("place_slug")
        .eq("vibe_list_id", params.id);

      if (rowsError) {
        setMessage(rowsError.message);
        setLoading(false);
        return;
      }

      const slugs = (rowsData ?? []).map((row: ListPlaceRow) => row.place_slug);

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

    loadList();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          Caricamento lista...
        </div>
      </main>
    );
  }

  if (!list) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h1 className="text-3xl font-bold tracking-tight">Lista non trovata.</h1>
          <p className="mt-3 leading-7 text-[#55554F]">
            Questa Vibe List non esiste oppure non è più disponibile.
          </p>
          <Link
            href="/vibe-lists"
            className="mt-6 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
          >
            Torna alle liste
          </Link>
        </div>
      </main>
    );
  }

  const routesHref = `/routes?vibe=${encodeURIComponent(list.vibe)}`;

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/vibe-lists"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
        >
          ← Torna alle Vibe Lists
        </Link>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-semibold text-[#7A7A73]">
              {list.city} · {list.visibility}
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {list.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#55554F]">
              {list.description ||
                "Una board creata dalla community per raccogliere luoghi con la stessa atmosfera."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]">
                {list.vibe}
              </span>

              <span className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]">
                {places.length} luoghi
              </span>

              <span className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]">
                Vibe List
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => setSaved(!saved)}
                className={`rounded-full px-6 py-4 text-sm font-bold ${
                  saved
                    ? "bg-[#F1F1EE] text-[#111111]"
                    : "bg-[#111111] text-white"
                }`}
              >
                {saved ? "Lista salvata ✓" : "Salva lista"}
              </button>

              <Link
                href={routesHref}
                onClick={() => setRouteCreated(true)}
                className="rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
              >
                {routeCreated ? "Percorso aperto ✓" : "🗺️ Crea percorso"}
              </Link>

              <Link
                href="/feed"
                className="rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
              >
                Aggiungi luoghi
              </Link>

              <Link
                href="/community"
                className="rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
              >
                Apri community
              </Link>
            </div>

            {/* Banner crea percorso */}
            {places.length >= 2 && (
              <div className="mt-6 rounded-[1.5rem] bg-[#111111] p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                  Vibe Route
                </p>
                <p className="mt-2 text-lg font-bold leading-snug">
                  Hai {places.length} luoghi — trasformali in un percorso acquistabile.
                </p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Sfoglia i percorsi con vibe {list.vibe} già pronti da MoodScape, o usa questa lista come ispirazione.
                </p>
                <Link
                  href={routesHref}
                  className="mt-4 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111]"
                >
                  Vedi percorsi {list.vibe} →
                </Link>
              </div>
            )}
          </div>

          <aside className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Anteprima board
            </p>

            {places.length === 0 ? (
              <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-5">
                <p className="text-base font-bold">Nessun luogo ancora.</p>
                <p className="mt-2 text-sm leading-6 text-[#55554F]">
                  Apri un luogo dal Feed e aggiungilo a questa lista.
                </p>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-2 gap-3">
                {places.slice(0, 4).map((place) => (
                  <Link
                    key={place.slug}
                    href={`/place/${place.slug}`}
                    className="overflow-hidden rounded-[1.5rem] bg-[#F7F7F5] p-2"
                  >
                    <PlaceImage
                      imageUrl={place.image_url}
                      name={place.name}
                      vibe={place.vibe}
                      className="h-32 rounded-[1.25rem]"
                    />
                    <p className="mt-3 line-clamp-2 text-sm font-bold">{place.name}</p>
                  </Link>
                ))}
              </div>
            )}

            {/* Promo percorso nella sidebar */}
            <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9A9A92]">
                Percorsi correlati
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#55554F]">
                Trova percorsi con vibe {list.vibe} già curati da MoodScape.
              </p>
              <Link
                href={routesHref}
                className="mt-3 inline-flex rounded-full bg-[#111111] px-4 py-2 text-xs font-bold text-white"
              >
                Sfoglia percorsi
              </Link>
            </div>
          </aside>
        </section>

        {message && (
          <section className="mt-5 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold">Errore</h2>
            <p className="mt-3 text-[#55554F]">{message}</p>
          </section>
        )}

        <section className="mt-8 pb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Luoghi nella lista</h2>
            <Link href="/feed" className="text-sm font-bold text-[#7A7A73]">
              Feed
            </Link>
          </div>

          {places.length === 0 ? (
            <div className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-2xl font-bold tracking-tight">Questa lista è ancora vuota.</h3>
              <p className="mt-3 leading-7 text-[#55554F]">
                Vai nel Feed, apri un luogo e usa "Aggiungi alla lista" per costruire questa board.
              </p>
              <Link
                href="/feed"
                className="mt-5 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
              >
                Apri Feed
              </Link>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">{place.name}</h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#55554F]">
                      {place.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                        {place.mood}
                      </span>
                      <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                        {place.price}
                      </span>
                      <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                        {place.time}
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