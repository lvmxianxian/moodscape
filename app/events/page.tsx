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
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-[#0E3532] p-8 text-[#F4EFE5] shadow-2xl shadow-[#0E3532]/10">
            <p className="inline-flex rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
              Events
            </p>

            <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Eventi scelti in base al mood, non solo alla data.
            </h1>

            <div className="mt-6 flex max-w-3xl items-center gap-3">
              <div className="h-px flex-1 bg-[#C99A57]" />
              <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#F4EFE5]/75">
              La parte Eventbrite di MoodScape: esperienze locali, date,
              creator, posti disponibili e CTA per partecipare. Ogni evento è
              collegato a mood e vibe.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#events-list"
                className="rounded-full bg-[#D8B77A] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
              >
                Scopri eventi
              </a>

              <Link
                href="/community"
                className="rounded-full border border-[#D8B77A] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
              >
                Apri community
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
              Event pulse
            </p>

            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5">
                <p className="font-serif text-5xl font-bold text-[#2A160E]">
                  {events.length}
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                  Eventi attivi
                </p>
              </div>

              <div className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5">
                <p className="font-serif text-5xl font-bold text-[#2A160E]">
                  {new Set(events.map((event) => event.organizer)).size}
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                  Organizzatori
                </p>
              </div>

              <div className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5">
                <p className="font-serif text-5xl font-bold text-[#2A160E]">
                  {events.reduce((total, event) => total + event.spots_left, 0)}
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                  Posti disponibili
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="events-list"
          className="mt-12 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                Discover
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold text-[#2A160E]">
                Eventi in arrivo.
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-[#425653]">
                Filtra per mood e vibe, poi apri l’evento per vedere dettagli,
                location e disponibilità.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={selectedMood}
                onChange={(event) => setSelectedMood(event.target.value)}
                className="rounded-full border border-[#D8B77A]/70 bg-[#F4EFE5] px-5 py-3 text-sm font-bold text-[#0E3532] outline-none"
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
                className="rounded-full border border-[#D8B77A]/70 bg-[#F4EFE5] px-5 py-3 text-sm font-bold text-[#0E3532] outline-none"
              >
                {vibeFilters.map((vibe) => (
                  <option key={vibe} value={vibe}>
                    {vibe}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {loading && (
          <section className="mt-8 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 text-[#425653]">
            Caricamento eventi...
          </section>
        )}

        {!loading && message && (
          <section className="mt-8 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 font-bold text-[#2A160E]">
            {message}
          </section>
        )}

        {!loading && !message && filteredEvents.length === 0 && (
          <section className="mt-8 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
            <h3 className="font-serif text-3xl font-bold text-[#2A160E]">
              Nessun evento trovato.
            </h3>

            <p className="mt-4 max-w-xl leading-7 text-[#425653]">
              Prova a cambiare mood o vibe. La sezione eventi può crescere con
              nuovi format e creator.
            </p>
          </section>
        )}

        {!loading && !message && filteredEvents.length > 0 && (
          <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5 transition hover:-translate-y-1 hover:border-[#C99A57]"
              >
                <PlaceImage
                  imageUrl={event.image_url}
                  name={event.title}
                  vibe={event.vibe}
                  className="h-52"
                />

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                      {event.city} · {event.area}
                    </p>

                    <h3 className="mt-3 font-serif text-3xl font-bold text-[#2A160E]">
                      {event.title}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-[#0E3532] px-4 py-3 text-center text-[#F4EFE5]">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#D8B77A]">
                      {formatDate(event.event_date).split(" ")[0]}
                    </p>
                    <p className="mt-1 font-serif text-2xl font-bold">
                      {formatDate(event.event_date).split(" ")[1]}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#425653]">
                  {event.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                    {event.event_time}
                  </span>

                  <span className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                    {event.price}
                  </span>

                  <span className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                    {event.spots_left} posti
                  </span>
                </div>

                <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532] transition group-hover:text-[#C99A57]">
                  Apri evento →
                </p>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}