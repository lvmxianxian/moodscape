"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

export default function EventDetailPage() {
  const params = useParams<{ slug: string }>();
  const [event, setEvent] = useState<DbEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      const { data } = await supabase
        .from("events")
        .select(
          "id,slug,title,city,area,mood,vibe,description,long_description,event_date,event_time,price,location,organizer,spots_left,image_url",
        )
        .eq("slug", params.slug)
        .maybeSingle();

      setEvent(data);
      setLoading(false);
    }

    loadEvent();
  }, [params.slug]);

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
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
          Caricamento evento...
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
          <h1 className="font-serif text-4xl font-bold text-[#2A160E]">
            Evento non trovato.
          </h1>

          <Link
            href="/events"
            className="mt-6 inline-flex rounded-full bg-[#0E3532] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
          >
            Torna agli eventi
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/events"
          className="text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
        >
          ← Torna agli eventi
        </Link>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] shadow-2xl shadow-[#0E3532]/10">
          <div className="grid gap-6 bg-[#0E3532] p-6 text-[#F4EFE5] md:grid-cols-[0.95fr_1.05fr] md:p-8">
            <PlaceImage
              imageUrl={event.image_url}
              name={event.title}
              vibe={event.vibe}
              className="min-h-[340px]"
            />

            <div className="flex min-h-[340px] flex-col justify-end">
              <span className="w-fit rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D8B77A]">
                {event.vibe}
              </span>

              <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                {event.title}
              </h1>

              <div className="mt-6 flex max-w-3xl items-center gap-3">
                <div className="h-px flex-1 bg-[#C99A57]" />
                <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
              </div>

              <p className="mt-5 text-lg font-semibold text-[#D8B77A]">
                {event.city} · {event.area} · {event.mood}
              </p>
            </div>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-[1.35fr_0.65fr] md:p-8">
            <div>
              <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0E3532]">
                EventScape
              </p>

              <h2 className="mt-6 font-serif text-4xl font-bold text-[#2A160E]">
                Perché partecipare
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#425653]">
                {event.long_description}
              </p>

              <div className="mt-8 rounded-[2rem] bg-[#0E3532] p-6 text-[#F4EFE5]">
                <h3 className="font-serif text-2xl font-bold text-[#D8B77A]">
                  Mood + vibe dell’evento
                </h3>

                <p className="mt-4 leading-7 text-[#F4EFE5]/80">
                  Questo evento è pensato per chi si sente{" "}
                  <strong className="text-[#D8B77A]">
                    {event.mood.toLowerCase()}
                  </strong>{" "}
                  e vuole vivere una vibe{" "}
                  <strong className="text-[#D8B77A]">{event.vibe}</strong>.
                </p>
              </div>

              <div className="mt-8 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F4EFE5] p-6">
                <h3 className="font-serif text-2xl font-bold text-[#2A160E]">
                  Organizzatore
                </h3>

                <p className="mt-3 leading-7 text-[#425653]">
                  {event.organizer}
                </p>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F4EFE5] p-6">
              <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
                Dettagli evento
              </h2>

              <div className="mt-6 space-y-5 text-sm">
                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    Data
                  </p>
                  <p className="mt-1 text-[#0E3532]">
                    {formatDate(event.event_date)}
                  </p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    Ora
                  </p>
                  <p className="mt-1 text-[#0E3532]">{event.event_time}</p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    Location
                  </p>
                  <p className="mt-1 text-[#0E3532]">{event.location}</p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    Prezzo
                  </p>
                  <p className="mt-1 text-[#0E3532]">{event.price}</p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    Disponibilità
                  </p>
                  <p className="mt-1 text-[#0E3532]">
                    {event.spots_left} posti rimasti
                  </p>
                </div>
              </div>

              <button
                onClick={() => setJoined(true)}
                className={`mt-8 w-full rounded-full px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] ${
                  joined
                    ? "bg-[#D8B77A] text-[#0E3532]"
                    : "bg-[#0E3532] text-[#F4EFE5]"
                }`}
              >
                {joined ? "Partecipazione salvata ✓" : "Partecipa"}
              </button>

              <button
                onClick={() => setSaved(!saved)}
                className="mt-3 w-full rounded-full border border-[#C99A57] bg-[#F8F2E8] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
              >
                {saved ? "Evento salvato ✓" : "Salva evento"}
              </button>

              <Link
                href="/community"
                className="mt-5 block text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
              >
                Apri community →
              </Link>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}