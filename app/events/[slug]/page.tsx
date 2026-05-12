"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";
import ReportButton from "@/components/ReportButton";

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

type EventAttendance = {
  event_slug: string;
  user_id: string;
};

type SavedEvent = {
  event_slug: string;
  user_id: string;
};

export default function EventDetailPage() {
  const params = useParams<{ slug: string }>();

  const [event, setEvent] = useState<DbEvent | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [attendees, setAttendees] = useState<EventAttendance[]>([]);
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    async function loadEvent() {
      setLoading(true);
      setActionMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUserId(session?.user.id ?? null);

      const { data } = await supabase
        .from("events")
        .select(
          "id,slug,title,city,area,mood,vibe,description,long_description,event_date,event_time,price,location,organizer,spots_left,image_url",
        )
        .eq("slug", params.slug)
        .maybeSingle();

      setEvent(data);

      const { data: attendanceData } = await supabase
        .from("event_attendees")
        .select("event_slug,user_id")
        .eq("event_slug", params.slug);

      const { data: savedData } = await supabase
        .from("saved_events")
        .select("event_slug,user_id")
        .eq("event_slug", params.slug);

      setAttendees(attendanceData ?? []);
      setSavedEvents(savedData ?? []);
      setLoading(false);
    }

    loadEvent();
  }, [params.slug]);

  const joined = useMemo(() => {
    return Boolean(
      userId &&
        attendees.some(
          (attendance) =>
            attendance.user_id === userId &&
            attendance.event_slug === params.slug,
        ),
    );
  }, [attendees, params.slug, userId]);

  const saved = useMemo(() => {
    return Boolean(
      userId &&
        savedEvents.some(
          (savedEvent) =>
            savedEvent.user_id === userId &&
            savedEvent.event_slug === params.slug,
        ),
    );
  }, [params.slug, savedEvents, userId]);

  const remainingSpots = event
    ? Math.max(event.spots_left - attendees.length, 0)
    : 0;

  function requireLogin() {
    if (!userId) {
      setActionMessage(
        "Per partecipare o salvare un evento devi prima accedere.",
      );
      return false;
    }

    setActionMessage("");
    return true;
  }

  async function toggleAttendance() {
    if (!event || !requireLogin() || !userId) return;

    if (joined) {
      const { error } = await supabase
        .from("event_attendees")
        .delete()
        .eq("user_id", userId)
        .eq("event_slug", event.slug);

      if (error) {
        setActionMessage(error.message);
        return;
      }

      setAttendees((current) =>
        current.filter(
          (attendance) =>
            !(
              attendance.user_id === userId &&
              attendance.event_slug === event.slug
            ),
        ),
      );

      setActionMessage("Partecipazione rimossa.");
      return;
    }

    const newAttendance = {
      user_id: userId,
      event_slug: event.slug,
    };

    const { error } = await supabase
      .from("event_attendees")
      .insert(newAttendance);

    if (error) {
      setActionMessage(error.message);
      return;
    }

    setAttendees((current) => [...current, newAttendance]);
    setActionMessage("Partecipazione salvata.");
  }

  async function toggleSavedEvent() {
    if (!event || !requireLogin() || !userId) return;

    if (saved) {
      const { error } = await supabase
        .from("saved_events")
        .delete()
        .eq("user_id", userId)
        .eq("event_slug", event.slug);

      if (error) {
        setActionMessage(error.message);
        return;
      }

      setSavedEvents((current) =>
        current.filter(
          (savedEvent) =>
            !(savedEvent.user_id === userId && savedEvent.event_slug === event.slug),
        ),
      );

      setActionMessage("Evento rimosso dai salvati.");
      return;
    }

    const newSavedEvent = {
      user_id: userId,
      event_slug: event.slug,
    };

    const { error } = await supabase.from("saved_events").insert(newSavedEvent);

    if (error) {
      setActionMessage(error.message);
      return;
    }

    setSavedEvents((current) => [...current, newSavedEvent]);
    setActionMessage("Evento salvato.");
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("it-IT", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          Caricamento evento...
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h1 className="text-3xl font-bold tracking-tight">
            Evento non trovato.
          </h1>

          <Link
            href="/events"
            className="mt-6 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
          >
            Torna agli eventi
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/events"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
        >
          ← Torna agli eventi
        </Link>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5">
            <PlaceImage
              imageUrl={event.image_url}
              name={event.title}
              vibe={event.vibe}
              className="min-h-[360px]"
            />

            <div className="p-3 pt-6">
              <p className="text-sm font-bold text-[#7A7A73]">
                {event.city} · {event.area} · {event.vibe}
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                {event.title}
              </h1>

              <p className="mt-5 text-base leading-7 text-[#55554F]">
                {event.description}
              </p>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Dettagli evento
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-bold text-[#7A7A73]">Data</p>
                <p className="mt-1 text-lg font-bold">
                  {formatDate(event.event_date)}
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-bold text-[#7A7A73]">Ora</p>
                <p className="mt-1 text-lg font-bold">{event.event_time}</p>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-bold text-[#7A7A73]">Location</p>
                <p className="mt-1 text-lg font-bold">{event.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                  <p className="text-sm font-bold text-[#7A7A73]">Prezzo</p>
                  <p className="mt-1 text-lg font-bold">{event.price}</p>
                </div>

                <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                  <p className="text-sm font-bold text-[#7A7A73]">Posti</p>
                  <p className="mt-1 text-lg font-bold">{remainingSpots}</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-bold text-[#7A7A73]">
                  Partecipanti
                </p>
                <p className="mt-1 text-lg font-bold">{attendees.length}</p>
              </div>
            </div>

            {!userId && (
              <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-semibold leading-6 text-[#55554F]">
                  Accedi per partecipare o salvare questo evento.
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    href="/login"
                    className="rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white"
                  >
                    Accedi
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111]"
                  >
                    Registrati
                  </Link>
                </div>
              </div>
            )}

            {actionMessage && (
              <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-4 text-sm font-semibold leading-6 text-[#55554F]">
                {actionMessage}
              </div>
            )}

            <ReportButton
              targetType="event"
              targetId={event.slug}
              label="Segnala evento"
            />

            <button
              onClick={toggleAttendance}
              className={`mt-5 w-full rounded-full px-6 py-4 text-sm font-bold ${
                joined
                  ? "bg-[#F1F1EE] text-[#111111]"
                  : "bg-[#111111] text-white"
              }`}
            >
              {joined ? "Partecipazione salvata ✓" : "Partecipa"}
            </button>

            <button
              onClick={toggleSavedEvent}
              className="mt-3 w-full rounded-full bg-[#F1F1EE] px-6 py-4 text-sm font-bold text-[#111111]"
            >
              {saved ? "Evento salvato ✓" : "Salva evento"}
            </button>

            <Link
              href="/community"
              className="mt-3 block rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
            >
              Apri community
            </Link>
          </aside>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Perché partecipare
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Esperienza pensata per il tuo mood.
            </h2>

            <p className="mt-4 text-base leading-8 text-[#55554F]">
              {event.long_description}
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Organizzatore
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              {event.organizer}
            </h2>

            <p className="mt-4 text-base leading-7 text-[#55554F]">
              Evento collegato al mood{" "}
              <span className="font-bold text-[#111111]">{event.mood}</span> e
              alla vibe{" "}
              <span className="font-bold text-[#111111]">{event.vibe}</span>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}