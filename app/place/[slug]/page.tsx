"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SavePlaceButton from "@/components/SavePlaceButton";
import AddToVibeListButton from "@/components/AddToVibeListButton";
import PlaceVisual from "@/components/PlaceVisual";

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
          "slug,name,city,area,mood,vibe,description,long_description,price,time,address,social_level,latitude,longitude",
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
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
          Caricamento luogo...
        </div>
      </main>
    );
  }

  if (!place) {
    return (
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
          <h1 className="font-serif text-4xl font-bold text-[#2A160E]">
            Luogo non trovato.
          </h1>

          <p className="mt-4 leading-7 text-[#425653]">
            Questo luogo non è presente nel database.
          </p>

          <Link
            href="/feed"
            className="mt-6 inline-flex rounded-full bg-[#0E3532] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
          >
            Torna al Feed
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] shadow-2xl shadow-[#0E3532]/10">
          <div className="grid gap-6 bg-[#0E3532] p-6 text-[#F4EFE5] md:grid-cols-[0.95fr_1.05fr] md:p-8">
            <PlaceVisual vibe={place.vibe} className="min-h-[320px]" />

            <div className="flex min-h-[320px] flex-col justify-end">
              <span className="w-fit rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D8B77A]">
                {place.vibe}
              </span>

              <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                {place.name}
              </h1>

              <div className="mt-6 flex max-w-3xl items-center gap-3">
                <div className="h-px flex-1 bg-[#C99A57]" />
                <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
              </div>

              <p className="mt-5 text-lg font-semibold text-[#D8B77A]">
                {place.city} · {place.area} · {place.mood}
              </p>
            </div>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-[1.4fr_0.6fr] md:p-8">
            <div>
              <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0E3532]">
                MoodScape insight
              </p>

              <h2 className="mt-6 font-serif text-4xl font-bold text-[#2A160E]">
                Perché andarci
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#425653]">
                {place.long_description}
              </p>

              <div className="mt-8 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F4EFE5] p-6">
                <h3 className="font-serif text-2xl font-bold text-[#2A160E]">
                  Descrizione breve
                </h3>

                <p className="mt-4 leading-7 text-[#425653]">
                  {place.description}
                </p>
              </div>

              <div className="mt-8 rounded-[2rem] bg-[#0E3532] p-6 text-[#F4EFE5]">
                <h3 className="font-serif text-2xl font-bold text-[#D8B77A]">
                  Abbinamento mood + vibe
                </h3>

                <p className="mt-4 leading-7 text-[#F4EFE5]/80">
                  Questo luogo è consigliato per chi si sente{" "}
                  <strong className="text-[#D8B77A]">
                    {place.mood.toLowerCase()}
                  </strong>{" "}
                  e vuole vivere una vibe{" "}
                  <strong className="text-[#D8B77A]">{place.vibe}</strong>.
                </p>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F4EFE5] p-6">
              <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
                Info pratiche
              </h2>

              <div className="mt-6 space-y-5 text-sm">
                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    Area
                  </p>
                  <p className="mt-1 text-[#0E3532]">{place.area}</p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    Indirizzo
                  </p>
                  <p className="mt-1 text-[#0E3532]">{place.address}</p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    Prezzo
                  </p>
                  <p className="mt-1 text-[#0E3532]">{place.price}</p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    Durata consigliata
                  </p>
                  <p className="mt-1 text-[#0E3532]">{place.time}</p>
                </div>

                <div>
                  <p className="font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    Livello socialità
                  </p>
                  <p className="mt-1 text-[#0E3532]">{place.social_level}</p>
                </div>
              </div>

              <SavePlaceButton placeSlug={place.slug} />

              <AddToVibeListButton placeSlug={place.slug} />

              <Link
                href={`/map?place=${place.slug}`}
                className="mt-3 block rounded-full border border-[#C99A57] bg-[#F8F2E8] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
              >
                Vedi sulla mappa
              </Link>

              <Link
                href="/feed"
                className="mt-5 block text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
              >
                ← Torna al feed
              </Link>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}