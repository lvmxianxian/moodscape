"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";

type EventAttendance = {
  event_slug: string;
  created_at: string;
};

type SavedEvent = {
  event_slug: string;
  created_at: string;
};

type DbEvent = {
  slug: string;
  title: string;
  city: string;
  area: string;
  mood: string;
  vibe: string;
  description: string;
  event_date: string;
  event_time: string;
  price: string;
  location: string;
  image_url: string | null;
};

export default function MyEventsPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [attendingEvents, setAttendingEvents] = useState<DbEvent[]>([]);
  const [savedEvents, setSavedEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMyEvents() {
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

      const { data: attendanceData, error: attendanceError } = await supabase
        .from("event_attendees")
        .select("event_slug,created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (attendanceError) {
        setMessage(attendanceError.message);
        setLoading(false);
        return;
      }

      const { data: savedData, error: savedError } = await supabase
        .from("saved_events")
        .select("event_slug,created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (savedError) {
        setMessage(savedError.message);
        setLoading(false);
        return;
      }

      const attendingSlugs = (attendanceData ?? []).map(
        (row: EventAttendance) => row.event_slug,
      );

      const savedSlugs = (savedData ?? []).map(
        (row: SavedEvent) => row.event_slug,
      );

      const allSlugs = Array.from(new Set([...attendingSlugs, ...savedSlugs]));

      if (allSlugs.length === 0) {
        setAttendingEvents([]);
        setSavedEvents([]);
        setLoading(false);
        return;
      }

      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select(
          "slug,title,city,area,mood,vibe,description,event_date,event_time,price,location,image_url",
        )
        .in("slug", allSlugs);

      if (eventsError) {
        setMessage(eventsError.message);
        setLoading(false);
        return;
      }

      const events = eventsData ?? [];

      const orderedAttending = attendingSlugs
        .map((slug) => events.find((event) => event.slug === slug))
        .filter(Boolean) as DbEvent[];

      const orderedSaved = savedSlugs
        .map((slug) => events.find((event) => event.slug === slug))
        .filter(Boolean) as DbEvent[];

      setAttendingEvents(orderedAttending);
      setSavedEvents(orderedSaved);
      setLoading(false);
    }

    loadMyEvents();
  }, []);

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("it-IT", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(new Date(date));
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          Caricamento eventi...
        </div>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold text-[#7A7A73]">
            I miei eventi
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight">
            Accedi per vedere i tuoi eventi.
          </h1>

          <p className="mt-4 leading-7 text-[#55554F]">
            Qui troverai gli eventi a cui partecipi e quelli che hai salvato.
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
                Area personale
              </p>

              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                I miei eventi.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Ritrova gli eventi a cui partecipi e quelli che hai salvato.
              </p>
            </div>

            <Link
              href="/events"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xl text-white shadow-sm"
            >
              +
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{attendingEvents.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Partecipo
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{savedEvents.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Salvati
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">
                {attendingEvents.length + savedEvents.length}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Totale
              </p>
            </div>
          </div>

          {message && (
            <div className="mt-5 rounded-[1.5rem] bg-white p-4 text-sm font-semibold text-[#55554F] shadow-sm ring-1 ring-black/5">
              {message}
            </div>
          )}
        </section>

        <section className="mx-auto mt-8 max-w-md lg:max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Eventi a cui partecipi
            </h2>

            <Link href="/events" className="text-sm font-bold text-[#7A7A73]">
              Scopri eventi
            </Link>
          </div>

          {attendingEvents.length === 0 ? (
            <div className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-2xl font-bold tracking-tight">
                Non partecipi ancora a nessun evento.
              </h3>

              <p className="mt-3 leading-7 text-[#55554F]">
                Apri un evento e clicca “Partecipa” per ritrovarlo qui.
              </p>

              <Link
                href="/events"
                className="mt-5 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
              >
                Vai agli eventi
              </Link>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {attendingEvents.map((event) => (
                <Link
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                >
                  <PlaceImage
                    imageUrl={event.image_url}
                    name={event.title}
                    vibe={event.vibe}
                    className="h-52"
                  />

                  <div className="p-2 pt-5">
                    <p className="text-sm font-semibold text-[#7A7A73]">
                      {formatDate(event.event_date)} · {event.event_time}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-[#7A7A73]">
                      {event.city} · {event.area}
                    </p>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#55554F]">
                      {event.description}
                    </p>

                    <p className="mt-5 text-sm font-bold text-[#111111]">
                      Apri evento →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto mt-8 max-w-md pb-10 lg:max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Eventi salvati
            </h2>

            <Link href="/events" className="text-sm font-bold text-[#7A7A73]">
              Tutti
            </Link>
          </div>

          {savedEvents.length === 0 ? (
            <div className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-2xl font-bold tracking-tight">
                Nessun evento salvato.
              </h3>

              <p className="mt-3 leading-7 text-[#55554F]">
                Salva un evento per ritrovarlo qui anche se non vuoi
                partecipare subito.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedEvents.map((event) => (
                <Link
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                >
                  <PlaceImage
                    imageUrl={event.image_url}
                    name={event.title}
                    vibe={event.vibe}
                    className="h-52"
                  />

                  <div className="p-2 pt-5">
                    <p className="text-sm font-semibold text-[#7A7A73]">
                      Salvato · {event.price}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-[#7A7A73]">
                      {event.location}
                    </p>

                    <p className="mt-5 text-sm font-bold text-[#111111]">
                      Apri evento →
                    </p>
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