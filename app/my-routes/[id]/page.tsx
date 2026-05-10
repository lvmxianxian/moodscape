"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";

type UserRoute = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  vibe: string | null;
  mood: string | null;
  source_vibe_list_id: string | null;
  created_at: string;
};

type UserRouteStop = {
  id: string;
  route_id: string;
  place_slug: string;
  order_index: number;
};

type DbPlace = {
  slug: string;
  name: string;
  city: string;
  area: string;
  vibe: string;
  description: string;
  time: string;
  image_url: string | null;
};

export default function UserRoutePage() {
  const params = useParams<{ id: string }>();

  const [route, setRoute] = useState<UserRoute | null>(null);
  const [stops, setStops] = useState<UserRouteStop[]>([]);
  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadRoute() {
      setLoading(true);
      setMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setAuthed(false);
        setLoading(false);
        return;
      }

      setAuthed(true);

      const { data: routeData, error: routeError } = await supabase
        .from("user_routes")
        .select(
          "id,user_id,title,description,vibe,mood,source_vibe_list_id,created_at",
        )
        .eq("id", params.id)
        .maybeSingle();

      if (routeError) {
        setMessage(routeError.message);
        setLoading(false);
        return;
      }

      if (!routeData) {
        setRoute(null);
        setLoading(false);
        return;
      }

      setRoute(routeData);

      const { data: stopsData, error: stopsError } = await supabase
        .from("user_route_stops")
        .select("id,route_id,place_slug,order_index")
        .eq("route_id", params.id)
        .order("order_index", { ascending: true });

      if (stopsError) {
        setMessage(stopsError.message);
        setLoading(false);
        return;
      }

      const orderedStops = stopsData ?? [];
      setStops(orderedStops);

      const slugs = orderedStops.map((stop) => stop.place_slug);

      if (slugs.length === 0) {
        setPlaces([]);
        setLoading(false);
        return;
      }

      const { data: placesData, error: placesError } = await supabase
        .from("places")
        .select("slug,name,city,area,vibe,description,time,image_url")
        .in("slug", slugs);

      if (placesError) {
        setMessage(placesError.message);
      } else {
        const ordered = orderedStops
          .map((stop) =>
            placesData?.find((place) => place.slug === stop.place_slug),
          )
          .filter(Boolean) as DbPlace[];
        setPlaces(ordered);
      }

      setLoading(false);
    }

    loadRoute();
  }, [params.id]);

  async function deleteRoute() {
    if (!route) return;

    const confirmed = window.confirm(
      "Vuoi eliminare questo percorso? L'azione è definitiva.",
    );
    if (!confirmed) return;

    setDeleting(true);
    setMessage("");

    const { error } = await supabase
      .from("user_routes")
      .delete()
      .eq("id", route.id);

    setDeleting(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    window.location.href = "/my-routes";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          Caricamento percorso...
        </div>
      </main>
    );
  }

  if (authed === false) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold text-[#7A7A73]">
            Percorso personale
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Accedi per vedere questo percorso.
          </h1>

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

  if (!route) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h1 className="text-3xl font-bold tracking-tight">
            Percorso non trovato.
          </h1>

          <p className="mt-3 leading-7 text-[#55554F]">
            Questo percorso non esiste oppure non è tuo.
          </p>

          <Link
            href="/my-routes"
            className="mt-6 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
          >
            Torna ai miei percorsi
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/my-routes"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
        >
          ← Torna ai miei percorsi
        </Link>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-semibold text-[#7A7A73]">
              Percorso creato · {stops.length} tappe
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {route.title}
            </h1>

            {route.description && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#55554F]">
                {route.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {route.vibe && (
                <span className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]">
                  {route.vibe}
                </span>
              )}

              {route.mood && (
                <span className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]">
                  {route.mood}
                </span>
              )}

              <span className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]">
                {stops.length} tappe
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {route.source_vibe_list_id && (
                <Link
                  href={`/vibe-lists/${route.source_vibe_list_id}`}
                  className="rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
                >
                  Apri Vibe List originale
                </Link>
              )}

              <Link
                href="/map"
                className="rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
              >
                Vedi sulla mappa
              </Link>

              <button
                type="button"
                onClick={deleteRoute}
                disabled={deleting}
                className="rounded-full bg-[#111111] px-6 py-4 text-sm font-bold text-white disabled:opacity-60 sm:col-span-2"
              >
                {deleting ? "Eliminazione..." : "Elimina percorso"}
              </button>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Anteprima percorso
            </p>

            {places.length === 0 ? (
              <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-5">
                <p className="text-base font-bold">Nessuna tappa.</p>
                <p className="mt-2 text-sm leading-6 text-[#55554F]">
                  Le tappe del percorso non sono più disponibili nel database.
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

                    <p className="mt-3 line-clamp-2 text-sm font-bold">
                      {place.name}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </section>

        {message && (
          <section className="mt-5 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-semibold text-[#55554F]">{message}</p>
          </section>
        )}

        <section className="mt-8 pb-10">
          <h2 className="text-2xl font-bold tracking-tight">Tappe in ordine</h2>

          {places.length === 0 ? (
            <div className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <p className="text-[#55554F]">
                Le tappe del percorso non sono più disponibili nel database. Il
                percorso resta salvato, ma serve aggiornarne i luoghi.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {places.map((place, index) => (
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
                      Tappa {index + 1} · {place.area}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {place.name}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#55554F]">
                      {place.description}
                    </p>

                    <p className="mt-5 text-sm font-bold text-[#111111]">
                      Apri luogo →
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
