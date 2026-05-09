"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 rounded-[2rem] bg-white p-8 text-[#5A5A6E]">
      Caricamento mappa...
    </div>
  ),
});

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-6xl">
        <section className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Vibe Map
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Esplora Roma con una mappa reale.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5A5A6E]">
            Questa versione usa Leaflet e OpenStreetMap: niente carta di credito
            e niente token. I luoghi sono ancora dati demo, ma sono su coordinate
            reali.
          </p>
        </section>

        <MapClient />

        <div className="mt-10">
          <Link
            href="/feed"
            className="inline-flex rounded-full bg-[#1A1A2E] px-6 py-3 font-semibold text-white"
          >
            Apri il Vibe Feed
          </Link>
        </div>
      </div>
    </main>
  );
}