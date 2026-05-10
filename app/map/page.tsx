"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
});

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
  latitude: number;
  longitude: number;
};

export default function MapPage() {
  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedVibe, setSelectedVibe] = useState("Tutte");

  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      setMessage("");

      const { data, error } = await supabase
        .from("places")
        .select(
          "slug,name,city,area,mood,vibe,description,price,time,latitude,longitude",
        )
        .order("created_at", { ascending: true });

      if (error) {
        setMessage(error.message);
      } else {
        setPlaces(data ?? []);
      }

      setLoading(false);
    }

    loadPlaces();
  }, []);

  const vibes = useMemo(() => {
    return ["Tutte", ...Array.from(new Set(places.map((place) => place.vibe)))];
  }, [places]);

  const filteredPlaces = useMemo(() => {
    if (selectedVibe === "Tutte") return places;
    return places.filter((place) => place.vibe === selectedVibe);
  }, [places, selectedVibe]);

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                Mappa MoodScape
              </p>

              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Esplora i luoghi sulla mappa.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Visualizza i posti consigliati in città, filtra per vibe e apri
                il dettaglio di ogni luogo.
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
              <p className="text-2xl font-bold">{vibes.length - 1}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Vibe
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{filteredPlaces.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Visibili
              </p>
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {vibes.map((vibe) => {
              const active = selectedVibe === vibe;

              return (
                <button
                  key={vibe}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`shrink-0 rounded-full px-5 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-[#111111] text-white"
                      : "bg-white text-[#111111] shadow-sm ring-1 ring-black/5"
                  }`}
                >
                  {vibe}
                </button>
              );
            })}
          </div>
        </section>

        {loading && (
          <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 text-[#7A7A73] shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
            Caricamento mappa...
          </section>
        )}

        {!loading && message && (
          <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
            <h2 className="text-2xl font-bold">Errore nel caricamento.</h2>
            <p className="mt-3 text-[#55554F]">{message}</p>
          </section>
        )}

        {!loading && !message && (
          <section className="mx-auto mt-6 grid max-w-md gap-5 lg:max-w-7xl lg:grid-cols-[1fr_380px]">
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5">
              <div className="h-[560px] overflow-hidden rounded-[1.5rem] bg-[#EDEDE8]">
                <MapView places={filteredPlaces} />
              </div>
            </div>

            <aside className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                  Luoghi sulla mappa
                </h2>

                <Link href="/feed" className="text-sm font-bold text-[#7A7A73]">
                  Feed
                </Link>
              </div>

              {filteredPlaces.length === 0 ? (
                <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-5">
                  <h3 className="text-xl font-bold">Nessun luogo visibile.</h3>
                  <p className="mt-2 text-sm leading-6 text-[#55554F]">
                    Cambia filtro o aggiungi altri luoghi nel database.
                  </p>
                </div>
              ) : (
                <div className="mt-5 grid max-h-[520px] gap-3 overflow-y-auto pr-1">
                  {filteredPlaces.map((place) => (
                    <Link
                      key={place.slug}
                      href={`/place/${place.slug}`}
                      className="rounded-[1.5rem] bg-[#F7F7F5] p-4 transition hover:bg-white hover:ring-1 hover:ring-black/5"
                    >
                      <p className="text-sm font-semibold text-[#7A7A73]">
                        {place.area} · {place.vibe}
                      </p>

                      <h3 className="mt-2 text-lg font-bold tracking-tight">
                        {place.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#55554F]">
                        {place.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#55554F]">
                          {place.mood}
                        </span>

                        <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#55554F]">
                          {place.price}
                        </span>

                        <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#55554F]">
                          {place.time}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </aside>
          </section>
        )}
      </div>
    </main>
  );
}