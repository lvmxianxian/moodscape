"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { places } from "@/lib/mock-data";

type DbVibeList = {
  id: string;
  title: string;
  city: string;
  vibe: string;
  description: string | null;
  visibility: string;
  created_at: string;
};

export default function VibeListDetailPage() {
  const params = useParams<{ id: string }>();
  const [list, setList] = useState<DbVibeList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadList() {
      const { data } = await supabase
        .from("vibe_lists")
        .select("id,title,city,vibe,description,visibility,created_at")
        .eq("id", params.id)
        .maybeSingle();

      setList(data);
      setLoading(false);
    }

    loadList();
  }, [params.id]);

  const suggestedPlaces = list
    ? places.filter((place) => place.vibe === list.vibe).slice(0, 3)
    : [];

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
            {list.city} · {list.visibility}
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F4EFE5]/75">
            {list.description || "Nessuna descrizione per questa lista."}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
            Luoghi suggeriti per questa vibe
          </h2>

          {suggestedPlaces.length === 0 ? (
            <div className="mt-5 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6">
              Non ci sono ancora luoghi demo per questa vibe.
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {suggestedPlaces.map((place) => (
                <Link
                  key={place.slug}
                  href={`/place/${place.slug}`}
                  className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5 transition hover:-translate-y-1"
                >
                  <div className="flex h-44 items-end rounded-[1.5rem] bg-[#0E3532] p-4">
                    <span className="rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#F4EFE5]">
                      {place.vibe}
                    </span>
                  </div>

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
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}