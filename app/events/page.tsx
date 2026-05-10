"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";

type DbEvent = {
  id: string;
  slug: string;
  title: string;
  city: string;
  area: string;
  mood: string;
  vibe: string;
  description: string;
  long_description: string;
  event_date: string;
  event_time: string;
  price: string;
  location: string;
  organizer: string;
  spots_left: number;
  image_url: string | null;
};

const moodFilters = [
  "Tutti",
  "Romantico",
  "Introspettivo",
  "Rilassato",
  "Sociale",
  "Creativo",
  "In cerca di ispirazione",
];

const vibeFilters = [
  "Tutte",
  "Dolce vita",
  "Dark academia",
  "Hidden garden",
  "Neon nightlife",
  "Golden hour walk",
  "Art gallery mood",
];

export default function EventsPage() {
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedMood, setSelectedMood] = useState("Tutti");
  const [selectedVibe, setSelectedVibe] = useState("Tutte");

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      setMessage("");

      const { data, error } = await supabase
        .from("events")
        .select(
          "id,slug,title,city,area,mood,vibe,description,long_description,event_date,event_time,price,location,organizer,spots_left,image_url",
        )
        .order("event_date", { ascending: true });

      if (error) {
        setMessage(error.message);
      } else {
        setEvents(data ?? []);
      }

      setLoading(false);
    }

    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const moodMatch =
        selectedMood === "Tutti" || event.mood === selectedMood;
      const vibeMatch =
        selectedVibe === "Tutte" || event.vibe === selectedVibe;

      return moodMatch && vibeMatch;
    });
  }, [events, selectedMood, selectedVibe]);

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("it-IT", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(new Date(date));
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                Eventi MoodScape
              </p>

              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Eventi scelti in base al mood.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Esperienze locali, creator, date, prezzi e posti disponibili.
                Filtra per mood e vibe, poi scegli cosa vivere.
              </p>
            </div>

            <Link
              href="/community"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm ring-1 ring-black/5"
            >
              ✦
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{events.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Eventi
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">
                {new Set(events.map((event) => event.organizer)).size}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Creator
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">
                {events.reduce((total, event) => total + event.spots_left, 0)}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Posti
              </p>
            </div>
          </div>

          <section className="mt-6 rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={selectedMood}
                onChange={(event) => setSelectedMood(event.target.value)}
                className="rounded-full bg-[#F7F7F5] px-5 py-3 text-sm font-bold text-[#111111] outline-none ring-1 ring-black/5"
              >
                {moodFilters.map((mood) => (
                  <option key={mood} value={mood}>
                    {mood}
                  </option>
                ))}
              </select>

              <select
                value={selectedVibe}
                onChange={(event) => setSelectedVibe(event.target.value)}
                className="rounded-full bg-[#F7F7F5] px-5 py-3 text-sm font-bold text-[#111111] outline-none ring-1 ring-black/5"
              >
                {vibeFilters.map((vibe) => (
                  <option key={vibe} value={vibe}>
                    {vibe}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </section>

        {loading && (
          <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 text-[#7A7A73] shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
            Caricamento eventi...
          </section>
        )}

        {!loading && message && (
          <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight">
              Non riesco a caricare gli eventi.
            </h2>
            <p className="mt-3 leading-7 text-[#55554F]">{message}</p>
          </section>
        )}

        {!loading && !message && filteredEvents.length === 0 && (
          <section className="mx-auto mt-6 max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 lg:max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight">
              Nessun evento trovato.
            </h2>
            <p className="mt-3 leading-7 text-[#55554F]">
              Prova a cambiare mood o vibe.
            </p>
          </section>
        )}

        {!loading && !message && filteredEvents.length > 0 && (
          <section className="mx-auto mt-6 grid max-w-md gap-4 md:grid-cols-2 lg:max-w-7xl lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
              >
                <PlaceImage
                  imageUrl={event.image_url}
                  name={event.title}
                  vibe={event.vibe}
                  className="h-56"
                />

                <div className="p-2 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[#7A7A73]">
                        {event.city} · {event.area}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#111111]">
                        {event.title}
                      </h2>
                    </div>

                    <div className="shrink-0 rounded-[1.25rem] bg-[#111111] px-4 py-3 text-center text-white">
                      <p className="text-xs font-bold uppercase text-white/50">
                        {formatDate(event.event_date).split(" ")[0]}
                      </p>
                      <p className="mt-1 text-xl font-bold">
                        {formatDate(event.event_date).split(" ")[1]}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#55554F]">
                    {event.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                      {event.event_time}
                    </span>

                    <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                      {event.price}
                    </span>

                    <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                      {event.spots_left} posti
                    </span>
                  </div>

                  <p className="mt-5 text-sm font-bold text-[#111111]">
                    Apri evento →
                  </p>
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}