"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PlaceVisual from "@/components/PlaceVisual";

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

type DbPlace = {
  slug: string;
  name: string;
  city: string;
  area: string;
  mood: string;
  vibe: string;
  description: string;
};

type VibeListPlaceRow = {
  place_slug: string;
};

export default function VibeListDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [list, setList] = useState<DbVibeList | null>(null);
  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadList() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setCurrentUserId(session?.user.id ?? null);

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

      setList(listData);

      const { data: rows, error: rowsError } = await supabase
        .from("vibe_list_places")
        .select("place_slug")
        .eq("vibe_list_id", params.id)
        .order("created_at", { ascending: true });

      if (rowsError) {
        setMessage(rowsError.message);
        setLoading(false);
        return;
      }

      const slugs = rows
        ? rows.map((row: VibeListPlaceRow) => row.place_slug)
        : [];

      if (slugs.length > 0) {
        const { data: placesData, error: placesError } = await supabase
          .from("places")
          .select("slug,name,city,area,mood,vibe,description")
          .in("slug", slugs);

        if (placesError) {
          setMessage(placesError.message);
        } else {
          const orderedPlaces = slugs
            .map((slug) => placesData?.find((place) => place.slug === slug))
            .filter(Boolean) as DbPlace[];

          setPlaces(orderedPlaces);
        }
      }

      setLoading(false);
    }

    loadList();
  }, [params.id]);

  async function handleDelete() {
    if (!list) return;

    const confirmed = window.confirm(
      "Vuoi davvero eliminare questa Vibe List?",
    );

    if (!confirmed) return;

    setDeleting(true);
    setMessage("");

    const { error } = await supabase
      .from("vibe_lists")
      .delete()
      .eq("id", list.id)
      .eq("user_id", currentUserId);

    if (error) {
      setMessage(error.message);
      setDeleting(false);
      return;
    }

    router.push("/vibe-lists");
  }

  async function handleRemovePlace(placeSlug: string) {
    if (!list) return;

    const { error } = await supabase
      .from("vibe_list_places")
      .delete()
      .eq("vibe_list_id", list.id)
      .eq("place_slug", placeSlug);

    if (error) {
      setMessage(error.message);
      return;
    }

    setPlaces((currentPlaces) =>
      currentPlaces.filter((place) => place.slug !== placeSlug),
    );
  }

  const canEdit = Boolean(list && currentUserId === list.user_id);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
          Caricamento lista...
        </div>
      </main>
    );
  }

  if (!list) {
    return (
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
          <h1 className="font-serif text-4xl font-bold text-[#2A160E]">
            Lista non trovata.
          </h1>

          <Link
            href="/vibe-lists"
            className="mt-6 inline-flex rounded-full bg-[#0E3532] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
          >
            Torna alle Vibe Lists
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/vibe-lists"
          className="text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
        >
          ← Torna alle Vibe Lists
        </Link>

        <section className="mt-8 rounded-[2rem] bg-[#0E3532] p-8 text-[#F4EFE5] shadow-2xl shadow-[#0E3532]/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="inline-flex rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
                {list.vibe}
              </p>

              <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                {list.title}
              </h1>

              <div className="mt-6 flex max-w-3xl items-center gap-3">
                <div className="h-px flex-1 bg-[#C99A57]" />
                <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
              </div>

              <p className="mt-5 text-lg font-semibold text-[#D8B77A]">
                {list.city} · {list.visibility} · {places.length} luoghi
              </p>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F4EFE5]/75">
                {list.description || "Nessuna descrizione per questa lista."}
              </p>
            </div>

            {canEdit && (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/vibe-lists/${list.id}/edit`}
                  className="rounded-full border border-[#D8B77A] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
                >
                  Modifica lista
                </Link>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-full bg-[#D8B77A] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532] disabled:opacity-60"
                >
                  {deleting ? "Eliminazione..." : "Elimina lista"}
                </button>
              </div>
            )}
          </div>

          {message && (
            <div className="mt-6 rounded-2xl bg-[#F4EFE5] p-4 text-sm font-bold text-[#2A160E]">
              {message}
            </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
            Luoghi dentro questa lista
          </h2>

          {places.length === 0 ? (
            <div className="mt-5 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6">
              <p className="leading-7 text-[#425653]">
                Questa lista non contiene ancora luoghi. Vai nel Feed, apri un
                luogo e aggiungilo a questa Vibe List.
              </p>

              <Link
                href="/feed"
                className="mt-6 inline-flex rounded-full bg-[#0E3532] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
              >
                Apri il Feed
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {places.map((place) => (
                <article
                  key={place.slug}
                  className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5"
                >
                  <Link href={`/place/${place.slug}`}>
                    <PlaceVisual vibe={place.vibe} className="h-44" />

                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                      {place.city} · {place.area}
                    </p>

                    <h3 className="mt-3 font-serif text-2xl font-bold text-[#2A160E]">
                      {place.name}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-[#425653]">
                      {place.description}
                    </p>
                  </Link>

                  {canEdit && (
                    <button
                      onClick={() => handleRemovePlace(place.slug)}
                      className="mt-5 w-full rounded-full border border-[#C99A57] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
                    >
                      Rimuovi dalla lista
                    </button>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}