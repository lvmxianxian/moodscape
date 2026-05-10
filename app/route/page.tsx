"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";

type DbVibeList = {
  id: string;
  user_id: string;
  title: string;
  city: string;
  vibe: string;
  description: string | null;
};

type DbPlace = {
  slug: string;
  name: string;
  city: string;
  area: string;
  vibe: string;
  mood: string;
  description: string;
  time: string;
  image_url: string | null;
};

const demoStops = [
  {
    time: "10:00",
    name: "Biblioteca Angelica",
    area: "Centro storico",
    duration: "60 min",
    vibe: "Dark academia",
    description:
      "Inizia con una tappa silenziosa e contemplativa tra libri, architettura storica e atmosfera da studio segreto.",
  },
  {
    time: "11:30",
    name: "Caffè storico",
    area: "Centro storico",
    duration: "45 min",
    vibe: "Dolce vita",
    description:
      "Pausa lenta con caffè, tavolino all’aperto e mood da mattina romana.",
  },
  {
    time: "13:00",
    name: "Giardino degli Aranci",
    area: "Aventino",
    duration: "50 min",
    vibe: "Romantic ruins",
    description:
      "Vista panoramica, camminata morbida e atmosfera romantica per chiudere il percorso.",
  },
];

function DemoRoute() {
  const [saved, setSaved] = useState(false);

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8">
          <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
            Vibe Route
          </p>

          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
            Un itinerario costruito sulla tua atmosfera.
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#425653]">
            Questa è una demo di percorso. Apri una delle tue Vibe Lists e
            clicca “Crea percorso” per generarne uno reale, salvabile nella tua
            area personale.
          </p>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                  Roma · 3 tappe · 3 ore circa
                </p>

                <h2 className="mt-3 font-serif text-4xl font-bold text-[#2A160E]">
                  Dark Academia Morning
                </h2>
              </div>

              <button
                onClick={() => setSaved(!saved)}
                className={`rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] ${
                  saved
                    ? "bg-[#2A160E] text-[#F4EFE5]"
                    : "bg-[#0E3532] text-[#F4EFE5]"
                }`}
              >
                {saved ? "Salvata ✓" : "Salva route"}
              </button>
            </div>

            <div className="mt-8 space-y-5">
              {demoStops.map((stop, index) => (
                <article
                  key={stop.name}
                  className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F4EFE5] p-5"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0E3532] font-bold text-[#F4EFE5]">
                      {index + 1}
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                        {stop.time} · {stop.duration}
                      </p>

                      <h3 className="mt-2 font-serif text-3xl font-bold text-[#2A160E]">
                        {stop.name}
                      </h3>

                      <p className="mt-2 text-sm font-semibold text-[#0E3532]">
                        {stop.area} · {stop.vibe}
                      </p>

                      <p className="mt-4 leading-7 text-[#425653]">
                        {stop.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] bg-[#0E3532] p-6 text-[#F4EFE5] shadow-xl shadow-[#0E3532]/10">
            <h2 className="font-serif text-3xl font-bold text-[#D8B77A]">
              Riepilogo percorso
            </h2>

            <div className="mt-6 space-y-4">
              {[
                ["Mood", "Curioso"],
                ["Vibe", "Dark academia"],
                ["Budget", "€–€€"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-[#D8B77A]/30 bg-[#F4EFE5]/10 p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
                    {label}
                  </p>
                  <p className="mt-2 font-serif text-2xl font-bold text-[#F4EFE5]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/vibe-lists"
              className="mt-8 block rounded-full bg-[#F4EFE5] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
            >
              Vai alle Vibe Lists
            </Link>

            <Link
              href="/map"
              className="mt-3 block rounded-full border border-[#D8B77A] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Vedi sulla mappa
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}

function PreviewFromList({ listId }: { listId: string }) {
  const router = useRouter();

  const [list, setList] = useState<DbVibeList | null>(null);
  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAuthed(Boolean(session));

      const { data: listData, error: listError } = await supabase
        .from("vibe_lists")
        .select("id,user_id,title,city,vibe,description")
        .eq("id", listId)
        .maybeSingle();

      if (listError) {
        setMessage(listError.message);
        setLoading(false);
        return;
      }

      if (!listData) {
        setLoading(false);
        return;
      }

      setList(listData);

      const { data: rowsData, error: rowsError } = await supabase
        .from("vibe_list_places")
        .select("place_slug")
        .eq("vibe_list_id", listId);

      if (rowsError) {
        setMessage(rowsError.message);
        setLoading(false);
        return;
      }

      const slugs = (rowsData ?? []).map((row) => row.place_slug);

      if (slugs.length === 0) {
        setPlaces([]);
        setLoading(false);
        return;
      }

      const { data: placesData, error: placesError } = await supabase
        .from("places")
        .select("slug,name,city,area,vibe,mood,description,time,image_url")
        .in("slug", slugs);

      if (placesError) {
        setMessage(placesError.message);
      } else {
        const ordered = slugs
          .map((slug) => placesData?.find((place) => place.slug === slug))
          .filter(Boolean) as DbPlace[];
        setPlaces(ordered);
      }

      setLoading(false);
    }

    load();
  }, [listId]);

  async function saveRoute() {
    if (!list) return;
    if (places.length === 0) return;

    setSaving(true);
    setMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setMessage("Per salvare il percorso devi prima accedere.");
      setSaving(false);
      return;
    }

    const dominantMood =
      places.find((place) => place.mood)?.mood ?? null;

    const { data: routeData, error: routeError } = await supabase
      .from("user_routes")
      .insert({
        user_id: session.user.id,
        title: list.title,
        description: list.description,
        vibe: list.vibe,
        mood: dominantMood,
        source_vibe_list_id: list.id,
      })
      .select("id")
      .single();

    if (routeError || !routeData) {
      setMessage(routeError?.message ?? "Errore nel salvataggio.");
      setSaving(false);
      return;
    }

    const stopsPayload = places.map((place, index) => ({
      route_id: routeData.id,
      place_slug: place.slug,
      order_index: index,
    }));

    const { error: stopsError } = await supabase
      .from("user_route_stops")
      .insert(stopsPayload);

    if (stopsError) {
      setMessage(stopsError.message);
      setSaving(false);
      return;
    }

    router.push(`/my-routes/${routeData.id}`);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          Caricamento anteprima percorso...
        </div>
      </main>
    );
  }

  if (!list) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h1 className="text-3xl font-bold tracking-tight">
            Vibe List non trovata.
          </h1>

          <p className="mt-3 leading-7 text-[#55554F]">
            Questa lista non esiste o non è più disponibile.
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

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/vibe-lists/${list.id}`}
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
        >
          ← Torna alla Vibe List
        </Link>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-semibold text-[#7A7A73]">
              Anteprima percorso · {places.length} tappe
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {list.title}
            </h1>

            {list.description && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#55554F]">
                {list.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]">
                {list.vibe}
              </span>

              <span className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]">
                {list.city}
              </span>

              <span className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]">
                {places.length} tappe
              </span>
            </div>

            {!authed && (
              <div className="mt-6 rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-semibold leading-6 text-[#55554F]">
                  Accedi per salvare questo percorso nella tua area personale.
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

            {message && (
              <div className="mt-6 rounded-[1.5rem] bg-[#F7F7F5] p-4 text-sm font-semibold leading-6 text-[#55554F]">
                {message}
              </div>
            )}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={saveRoute}
                disabled={saving || places.length === 0 || !authed}
                className="rounded-full bg-[#111111] px-6 py-4 text-sm font-bold text-white disabled:opacity-60"
              >
                {saving ? "Salvataggio..." : "Salva nei miei percorsi"}
              </button>

              <Link
                href={`/vibe-lists/${list.id}`}
                className="rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
              >
                Annulla
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Tappe in ordine
            </p>

            {places.length === 0 ? (
              <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-5">
                <p className="text-base font-bold">Nessuna tappa.</p>
                <p className="mt-2 text-sm leading-6 text-[#55554F]">
                  Aggiungi prima dei luoghi alla Vibe List, poi torna qui.
                </p>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-2 gap-3">
                {places.slice(0, 4).map((place, index) => (
                  <div
                    key={place.slug}
                    className="overflow-hidden rounded-[1.5rem] bg-[#F7F7F5] p-2"
                  >
                    <PlaceImage
                      imageUrl={place.image_url}
                      name={place.name}
                      vibe={place.vibe}
                      className="h-32 rounded-[1.25rem]"
                    />

                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                      Tappa {index + 1}
                    </p>

                    <p className="mt-1 line-clamp-2 text-sm font-bold">
                      {place.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </section>

        {places.length > 0 && (
          <section className="mt-8 pb-10">
            <h2 className="text-2xl font-bold tracking-tight">Tappe complete</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {places.map((place, index) => (
                <article
                  key={place.slug}
                  className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5"
                >
                  <PlaceImage
                    imageUrl={place.image_url}
                    name={place.name}
                    vibe={place.vibe}
                    className="h-56"
                  />

                  <div className="p-2 pt-5">
                    <p className="text-sm font-semibold text-[#7A7A73]">
                      Tappa {index + 1} · {place.area}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {place.name}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#55554F]">
                      {place.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                        {place.vibe}
                      </span>

                      <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                        {place.time}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function RouteContent() {
  const searchParams = useSearchParams();
  const fromListId = searchParams.get("from");

  if (fromListId) {
    return <PreviewFromList listId={fromListId} />;
  }

  return <DemoRoute />;
}

export default function RoutePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
          <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            Caricamento percorso...
          </div>
        </main>
      }
    >
      <RouteContent />
    </Suspense>
  );
}
