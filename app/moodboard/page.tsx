import Link from "next/link";
import { places } from "@/lib/mock-data";

const savedPlaces = places.slice(0, 3);

export default function MoodboardPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-6xl">
        <section className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Moodboard personale
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            I posti che vuoi ricordare.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5A5A6E]">
            Questa è una prima versione demo della moodboard. I luoghi arrivano
            dagli stessi dati usati da Feed, Mappa e Dettaglio luogo.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {savedPlaces.map((place) => (
            <article
              key={place.slug}
              className="rounded-[2rem] bg-white p-5 shadow-lg shadow-black/5"
            >
              <div className="flex h-48 items-end rounded-[1.5rem] bg-[#EDE9FF] p-4">
                <span className="rounded-full bg-[#1A1A2E] px-4 py-2 text-xs font-semibold text-white">
                  {place.vibe}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-[#5B4FCF]">
                  {place.city} · {place.area}
                </p>

                <h2 className="mt-2 text-xl font-bold">{place.name}</h2>

                <p className="mt-1 text-sm font-semibold text-[#5B4FCF]">
                  Mood: {place.mood}
                </p>

                <p className="mt-4 text-sm leading-6 text-[#5A5A6E]">
                  {place.description}
                </p>

                <Link
                  href={`/place/${place.slug}`}
                  className="mt-5 inline-flex text-sm font-semibold text-[#5B4FCF]"
                >
                  Apri dettaglio →
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-black/5">
            <h2 className="text-2xl font-bold">Vibe più salvate</h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Dolce vita", "Dark academia", "Neon nightlife"].map((vibe) => (
                <span
                  key={vibe}
                  className="rounded-full bg-[#1A1A2E] px-4 py-2 text-sm font-semibold text-white"
                >
                  {vibe}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#1A1A2E] p-6 text-white shadow-lg shadow-black/10">
            <h2 className="text-2xl font-bold">Prossimo step reale</h2>

            <p className="mt-3 leading-7 text-white/70">
              Quando aggiungeremo login e database, questa pagina mostrerà solo
              i luoghi salvati dall’utente reale.
            </p>

            <Link
              href="/feed"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#1A1A2E]"
            >
              Torna al Feed
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}