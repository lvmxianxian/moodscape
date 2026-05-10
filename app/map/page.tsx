"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
              <div className="relative min-h-[560px] overflow-hidden rounded-[1.5rem] bg-[#EDEDE8]">
                <div className="absolute inset-0 opacity-60">
                  <div className="absolute left-8 top-20 h-[620px] w-4 rotate-45 rounded-full bg-white" />
                  <div className="absolute left-40 top-[-40px] h-[760px] w-4 -rotate-12 rounded-full bg-white" />
                  <div className="absolute right-20 top-10 h-[760px] w-4 rotate-[28deg] rounded-full bg-white" />
                  <div className="absolute left-0 top-72 h-4 w-full rounded-full bg-white" />
                  <div className="absolute left-0 top-40 h-3 w-full -rotate-6 rounded-full bg-white" />
                  <div className="absolute left-0 bottom-32 h-3 w-full rotate-3 rounded-full bg-white" />
                </div>

                <div className="absolute inset-0 p-6">
                  <div className="rounded-[1.5rem] bg-white/80 p-4 backdrop-blur">
                    <p className="text-sm font-bold text-[#7A7A73]">
                      Vista mappa
                    </p>
                    <p className="mt-1 text-xl font-bold">
                      {filteredPlaces.length} luoghi visibili
                    </p>
                  </div>

                  {filteredPlaces.slice(0, 10).map((place, index) => {
                    const positions = [
                      ["18%", "28%"],
                      ["52%", "22%"],
                      ["72%", "40%"],
                      ["30%", "55%"],
                      ["58%", "62%"],
                      ["80%", "72%"],
                      ["20%", "78%"],
                      ["44%", "42%"],
                      ["66%", "84%"],
                      ["36%", "18%"],
                    ];

                    const [left, top] = positions[index % positions.length];

                    return (
                      <Link
                        key={place.slug}
                        href={`/place/${place.slug}`}
                        style={{ left, top }}
                        className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#111111] text-sm font-bold text-white shadow-xl ring-4 ring-white"
                        title={place.name}
                      >
                        {index + 1}
                      </Link>
                    );
                  })}
                </div>
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
                  {filteredPlaces.map((place, index) => (
                    <Link
                      key={place.slug}
                      href={`/place/${place.slug}`}
                      className="rounded-[1.5rem] bg-[#F7F7F5] p-4 transition hover:bg-white hover:ring-1 hover:ring-black/5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xs font-bold text-white">
                          {index + 1}
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-[#7A7A73]">
                            {place.area} · {place.vibe}
                          </p>

                          <h3 className="mt-1 text-lg font-bold tracking-tight">
                            {place.name}
                          </h3>

                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#55554F]">
                            {place.description}
                          </p>
                        </div>
                      </div>

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