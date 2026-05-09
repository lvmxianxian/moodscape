import Link from "next/link";
import { places } from "@/lib/mock-data";

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-6xl">
        <section className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Vibe Feed
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Posti consigliati per la tua atmosfera.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5A5A6E]">
            Questa è una prima demo con dati finti. Più avanti collegheremo
            luoghi reali, utenti, salvataggi e database.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {places.map((place) => (
            <Link
              key={place.slug}
              href={`/place/${place.slug}`}
              className="group rounded-[2rem] bg-white p-5 shadow-lg shadow-black/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-48 items-end rounded-[1.5rem] bg-[#EDE9FF] p-4">
                <span className="rounded-full bg-[#1A1A2E] px-4 py-2 text-xs font-semibold text-white">
                  {place.vibe}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold">{place.name}</h2>
                  <span className="rounded-full bg-[#F7F4EF] px-3 py-1 text-xs font-semibold">
                    {place.price}
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-[#5B4FCF]">
                  {place.city} · {place.mood} · {place.time}
                </p>

                <p className="mt-4 text-sm leading-6 text-[#5A5A6E]">
                  {place.description}
                </p>

                <p className="mt-5 text-sm font-semibold text-[#5B4FCF]">
                  Apri dettaglio →
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}