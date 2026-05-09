"use client";

import Link from "next/link";
import { useState } from "react";
import { vibeLists } from "@/lib/mock-data";

export default function VibeListsPage() {
  const [lists, setLists] = useState(() =>
    vibeLists.map((list) => ({
      ...list,
      saved: false,
    })),
  );

  function toggleSave(title: string) {
    setLists((currentLists) =>
      currentLists.map((list) =>
        list.title === title ? { ...list, saved: !list.saved } : list,
      ),
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
              Raccolte tematiche di luoghi, percorsi e atmosfere. In questa demo
              puoi già salvare una lista, ma i dati sono ancora finti.
            </p>
          </div>

          <Link
            href="/vibe-lists/create"
            className="rounded-full bg-[#0E3532] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
          >
            Crea nuova lista
          </Link>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {lists.map((list) => (
            <article
              key={list.title}
              className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5"
            >
              <div className="flex h-56 items-end rounded-[1.5rem] bg-[#0E3532] p-4">
                <span className="rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#F4EFE5]">
                  {list.vibe}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                  {list.city} · {list.places} posti
                </p>

                <h2 className="mt-3 font-serif text-3xl font-bold text-[#2A160E]">
                  {list.title}
                </h2>

                <p className="mt-4 text-sm leading-6 text-[#425653]">
                  {list.description}
                </p>

                <button
                  onClick={() => toggleSave(list.title)}
                  className={`mt-6 w-full rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] ${
                    list.saved
                      ? "bg-[#2A160E] text-[#F4EFE5]"
                      : "bg-[#0E3532] text-[#F4EFE5]"
                  }`}
                >
                  {list.saved ? "Lista salvata ✓" : "Salva lista"}
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-[2rem] bg-[#0E3532] p-6 text-[#F4EFE5] shadow-xl shadow-[#0E3532]/10">
          <h2 className="font-serif text-3xl font-bold text-[#D8B77A]">
            Prossimo step reale
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-[#F4EFE5]/75">
            Nella versione reale qui aggiungeremo creazione lista, privacy
            pubblica/privata, aggiunta luoghi, profilo creator e salvataggio su
            database.
          </p>
        </section>
      </div>
    </main>
  );
}