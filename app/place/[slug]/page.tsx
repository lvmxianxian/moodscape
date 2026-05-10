"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SavePlaceButton from "@/components/SavePlaceButton";
import AddToVibeListButton from "@/components/AddToVibeListButton";
import PlaceImage from "@/components/PlaceImage";
import ReportButton from "@/components/ReportButton";

type DbPlace = {
  slug: string;
  name: string;
  city: string;
  area: string;
  mood: string;
  vibe: string;
  description: string;
  long_description: string;
  price: string;
  time: string;
  address: string;
  social_level: string;
  latitude: number;
  longitude: number;
  image_url: string | null;
};

export default function PlaceDetailPage() {
  const params = useParams<{ slug: string }>();
  const [place, setPlace] = useState<DbPlace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlace() {
      const { data } = await supabase
        .from("places")
        .select(
          "slug,name,city,area,mood,vibe,description,long_description,price,time,address,social_level,latitude,longitude,image_url",
        )
        .eq("slug", params.slug)
        .maybeSingle();

      setPlace(data);
      setLoading(false);
    }

    loadPlace();
  }, [params.slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          Caricamento luogo...
        </div>
      </main>
    );
  }

  if (!place) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h1 className="text-3xl font-bold tracking-tight">
            Luogo non trovato.
          </h1>

          <p className="mt-3 leading-7 text-[#55554F]">
            Questo luogo non è presente nel database.
          </p>

          <Link
            href="/feed"
            className="mt-6 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
          >
            Torna al Feed
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/feed"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
        >
          ← Torna al Feed
        </Link>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5">
            <PlaceImage
              imageUrl={place.image_url}
              name={place.name}
              vibe={place.vibe}
              className="min-h-[360px]"
            />

            <div className="p-3 pt-6">
              <p className="text-sm font-bold text-[#7A7A73]">
                {place.city} · {place.area} · {place.vibe}
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                {place.name}
              </h1>

              <p className="mt-5 text-base leading-7 text-[#55554F]">
                {place.description}
              </p>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Info pratiche
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-bold text-[#7A7A73]">Area</p>
                <p className="mt-1 text-lg font-bold">{place.area}</p>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-bold text-[#7A7A73]">Indirizzo</p>
                <p className="mt-1 text-lg font-bold">{place.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                  <p className="text-sm font-bold text-[#7A7A73]">Prezzo</p>
                  <p className="mt-1 text-lg font-bold">{place.price}</p>
                </div>

                <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                  <p className="text-sm font-bold text-[#7A7A73]">Durata</p>
                  <p className="mt-1 text-lg font-bold">{place.time}</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-bold text-[#7A7A73]">Socialità</p>
                <p className="mt-1 text-lg font-bold">{place.social_level}</p>
              </div>
            </div>

            <SavePlaceButton placeSlug={place.slug} />

            <AddToVibeListButton placeSlug={place.slug} />

            <Link
              href={`/map?place=${place.slug}`}
              className="mt-3 block rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
            >
              Vedi sulla mappa
            </Link>

            <div className="mt-5 flex justify-end">
              <ReportButton
                targetType="place"
                targetId={place.slug}
                variant="link"
                label="Segnala luogo"
              />
            </div>
          </aside>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Perché andarci
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Un luogo scelto per il tuo mood.
            </h2>

            <p className="mt-4 text-base leading-8 text-[#55554F]">
              {place.long_description}
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Mood + vibe
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              {place.mood} · {place.vibe}
            </h2>

            <p className="mt-4 text-base leading-7 text-[#55554F]">
              MoodScape consiglia questo posto se vuoi vivere una vibe{" "}
              <span className="font-bold text-[#111111]">{place.vibe}</span>{" "}
              partendo da un mood{" "}
              <span className="font-bold text-[#111111]">{place.mood}</span>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
