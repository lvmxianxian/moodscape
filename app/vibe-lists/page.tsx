"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { vibeLists } from "@/lib/mock-data";

type DbVibeList = {
  id: string;
  title: string;
  city: string;
  vibe: string;
  description: string | null;
  visibility: string;
  created_at: string;
};

export default function VibeListsPage() {
  const [dbLists, setDbLists] = useState<DbVibeList[]>([]);
  const [savedDemoTitles, setSavedDemoTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLists() {
      const { data } = await supabase
        .from("vibe_lists")
        .select("id,title,city,vibe,description,visibility,created_at")
        .order("created_at", { ascending: false });

      setDbLists(data ?? []);
      setLoading(false);
    }

    loadLists();
  }, []);

  function toggleSaveDemo(title: string) {
    setSavedDemoTitles((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  }

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
              Vibe Lists
            </p>

            <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
              Liste di posti costruite intorno a una vibe.
            </h1>

            <div className="mt-6 flex max-w-3xl items-center gap-3">
              <div className="h-px flex-1 bg-[#C99A57]" />
              <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
            </div>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#425653]">
              Qui vedi sia alcune liste demo sia le liste create davvero dagli
              utenti e salvate su Supabase.
            </p>
          </div>

          <Link
            href="/vibe-lists/create"
            className="rounded-full bg-[#0E3532] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
          >
            Crea nuova lista
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
            Liste reali
          </h2>

          {loading ? (
            <p className="mt-4 text-[#425653]">Caricamento liste reali...</p>
          ) : dbLists.length === 0 ? (
            <div className="mt-5 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6">
              <p className="text-[#425653]">
                Non ci sono ancora Vibe Lists reali. Crea la prima lista.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {dbLists.map((list) => (
                <Link
                  key={list.id}
                  href={`/vibe-lists/${list.id}`}
                  className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5 transition hover:-translate-y-1"
                >
                  <div className="flex h-44 items-end rounded-[1.5rem] bg-[#0E3532] p-4">
                    <span className="rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#F4EFE5]">
                      {list.vibe}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    {list.city} · {list.visibility}
                  </p>

                  <h3 className="mt-3 font-serif text-3xl font-bold text-[#2A160E]">
                    {list.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#425653]">
                    {list.description || "Nessuna descrizione."}
                  </p>

                  <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]">
                    Apri lista →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
            Liste demo
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {vibeLists.map((list) => {
              const saved = savedDemoTitles.includes(list.title);

              return (
                <article
                  key={list.title}
                  className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5"
                >
                  <div className="flex h-44 items-end rounded-[1.5rem] bg-[#0E3532] p-4">
                    <span className="rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#F4EFE5]">
                      {list.vibe}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    {list.city} · {list.places} posti
                  </p>

                  <h3 className="mt-3 font-serif text-3xl font-bold text-[#2A160E]">
                    {list.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#425653]">
                    {list.description}
                  </p>

                  <button
                    onClick={() => toggleSaveDemo(list.title)}
                    className={`mt-6 w-full rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] ${
                      saved
                        ? "bg-[#2A160E] text-[#F4EFE5]"
                        : "bg-[#0E3532] text-[#F4EFE5]"
                    }`}
                  >
                    {saved ? "Lista salvata ✓" : "Salva lista demo"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}