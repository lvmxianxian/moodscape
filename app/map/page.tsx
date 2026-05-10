"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="mt-10 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 text-[#425653] shadow-xl shadow-[#0E3532]/5">
      Caricamento mappa...
    </div>
  ),
});

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8">
          <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
            Vibe Map
          </p>

          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
            Esplora Roma attraverso mood e atmosfera.
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#425653]">
            La mappa legge i luoghi dal database Supabase e li mostra su
            coordinate reali con filtri per vibe.
          </p>
        </section>

        <Suspense
          fallback={
            <div className="mt-10 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 text-[#425653] shadow-xl shadow-[#0E3532]/5">
              Caricamento mappa...
            </div>
          }
        >
          <MapClient />
        </Suspense>

        <div className="mt-10">
          <Link
            href="/feed"
            className="inline-flex rounded-full bg-[#0E3532] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
          >
            Apri il Vibe Feed
          </Link>
        </div>
      </div>
    </main>
  );
}