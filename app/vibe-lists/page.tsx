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
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-6xl">
        <section className="mt-8 flex justify-end">
          <Link
            href="/vibe-lists/create"
            className="rounded-full bg-[#5B4FCF] px-6 py-3 font-semibold text-white"
          >
            Crea nuova lista
          </Link>
        </section>

        <section className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Vibe Lists
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Liste di posti costruite intorno a una vibe.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5A5A6E]">
            Raccolte tematiche di luoghi, percorsi e atmosfere. In questa demo
            puoi già salvare una lista, ma i dati sono ancora finti.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {lists.map((list) => (
            <article
              key={list.title}
              className="rounded-[2rem] bg-white p-5 shadow-lg shadow-black/5"
            >
              <div className="flex h-48 items-end rounded-[1.5rem] bg-[#EDE9FF] p-4">
                <span className="rounded-full bg-[#1A1A2E] px-4 py-2 text-xs font-semibold text-white">
                  {list.vibe}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-[#5B4FCF]">
                  {list.city} · {list.places} posti
                </p>

                <h2 className="mt-2 text-2xl font-bold">{list.title}</h2>

                <p className="mt-4 text-sm leading-6 text-[#5A5A6E]">
                  {list.description}
                </p>

                <button
                  onClick={() => toggleSave(list.title)}
                  className={`mt-6 w-full rounded-full px-5 py-3 font-semibold ${
                    list.saved
                      ? "bg-[#1A1A2E] text-white"
                      : "bg-[#5B4FCF] text-white"
                  }`}
                >
                  {list.saved ? "Lista salvata ✓" : "Salva lista"}
                </button>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-12 rounded-[2rem] bg-white p-6 shadow-lg shadow-black/5">
          <h2 className="text-2xl font-bold">Prossimo step</h2>

          <p className="mt-3 text-[#5A5A6E]">
            Nella versione reale qui aggiungeremo creazione lista, privacy
            pubblica/privata, aggiunta luoghi, profilo creator e salvataggio su
            database.
          </p>
        </div>
      </div>
    </main>
  );
}